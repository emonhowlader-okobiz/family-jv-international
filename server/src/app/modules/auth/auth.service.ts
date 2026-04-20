import bcrypt from 'bcrypt';
import { AuthProvider, UserRole, User, Auth, Host } from "../../models";
import { AppError } from "../../errors/AppError";
import { redisClient } from "../../lib/redis";
import { generateOtpEmailHTML } from "../../utils/emailHTMLtext";
import { generateOTP } from "../../utils/generateOTP";
import { generateAccessToken, generateRefreshToken, generateResetPassToken, TJwtPayload, verifyRefreshToken } from "../../utils/jwt";
import { sendEmail } from "../../utils/sendEmail";
import { ChangePasswordInput, ForgotPasswordInput, LoginInput, RegisterInput, ResetPasswordInput, VerifyOptInput } from "./auth.validation";
import { parseTimeToMs } from '../../utils/parseTime';
import { env } from '../../config/env';

const OTP_PREFIX = "forgot-password-otp:";
const OTP_EXPIRATION = 2 * 60 //2 minute
const REFRESH_PREFIX = "refresh-token:";


const register = async (data: RegisterInput) => {
    const existingUser = await User.findOne({
        email: data.email,
    });

    if (existingUser) {
        throw new AppError('User with this email already exists', 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const session = await User.startSession();
    session.startTransaction();

    try {
        const user = new User({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            phone: data.phone,
            role: data.role as UserRole,
        });

        await user.save({ session });

        const auth = new Auth({
            provider: AuthProvider.credentials,
            providerId: data.email,
            userId: user._id.toString(),
        });

        await auth.save({ session });

        if (data.role === UserRole.HOST) {
            const host = new Host({
                userId: user._id.toString(),
                businessName: data.business_name,
                nidNumber: data.nid_number,
            });
            await host.save({ session });
        }

        await session.commitTransaction();

        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            avatar: user.avatar,
            createdAt: user.createdAt,
        };
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

const login = async (data: LoginInput) => {
    const user = await User.findOne({
        email: data.email,
    }).select('_id name email password role avatar status isDeleted');

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    if (user.isDeleted) {
        throw new AppError("This account has been deleted", 403);
    }

    if (user.status !== "ACTIVE") {
        throw new AppError("Your account is not active", 403);
    }

    // Check auth provider (credentials login allowed)
    const authProvider = await Auth.findOne({
        userId: user._id.toString(),
        provider: AuthProvider.credentials,
    });

    if (!authProvider) {
        throw new AppError(
            "This account was registered using social login. Please login with Google.",
            400
        );
    }

    if (!user.password) {
        throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
    }

    const tokenPayload: TJwtPayload = {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
    };

    // Generate tokens
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    const refreshMaxAge = parseTimeToMs(env.JWT_REFRESH_EXPIRES_IN);

    // 🔄 Store refresh token for rotation
    await redisClient.set(`${REFRESH_PREFIX}${user._id}`, refreshToken, {
        expiration: { type: "EX", value: refreshMaxAge }, 
    });

    return {
        accessToken,
        refreshToken,
        user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
        },
    };
};

const getNewAccessToken = async (refreshToken: string) => {
    const decoded = verifyRefreshToken(refreshToken) as TJwtPayload;

    const user = await User.findById(decoded.userId).select('_id email role status isDeleted');

    if (!user) throw new AppError("User not found", 404);
    if (user.isDeleted) throw new AppError("User account deleted", 403);
    if (user.status !== "ACTIVE") throw new AppError("User account is not active", 403);

    // Check if refresh token is valid in Redis
    const storedToken = await redisClient.get(`${REFRESH_PREFIX}${user._id}`);
    if (storedToken !== refreshToken) {
        throw new AppError("Invalid or reused refresh token", 403);
    }

    const tokenPayload: TJwtPayload = {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const newRefreshToken = generateRefreshToken(tokenPayload);

    const refreshMaxAge = parseTimeToMs(env.JWT_REFRESH_EXPIRES_IN);

    // Rotate: replace old refresh token with new one
    await redisClient.set(`${REFRESH_PREFIX}${user._id}`, newRefreshToken, {
        expiration: { type: "EX", value: refreshMaxAge },
    });

    return { accessToken, newRefreshToken };
};


const changePassword = async (user: TJwtPayload, data: ChangePasswordInput) => {
    const existingUser = await User.findById(user.userId);

    if (!existingUser) {
        throw new AppError("User not found", 404);
    }

    const isMatch = await bcrypt.compare(data.oldPassword, existingUser.password as string);
    if (!isMatch) {
        throw new AppError("Old password is incorrect", 400);
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    existingUser.password = hashedPassword;
    await existingUser.save();

    return { message: "Password changed successfully" };
}

const forgotPassword = async (data: ForgotPasswordInput) => {
    const user = await User.findOne({
        email: data.email,
    });

    if (!user) {
        throw new AppError("User with this email does not exist", 404);
    }

    const otp = generateOTP();

    await redisClient.set(`${OTP_PREFIX}${user.email}`, otp, {
        expiration: {
            type: "EX",
            value: OTP_EXPIRATION
        }
    });

    const emailHtml = generateOtpEmailHTML(otp);

    await sendEmail(
        user.email,
        emailHtml,
        "Your Password Reset OTP",
    );

    return { message: "OTP sent to your email" };
}

const verifyForgotPasswordOtp = async (data: VerifyOptInput) => {
    const user = await User.findOne({
        email: data.email,
    });

    if (!user) {
        throw new AppError("User with this email does not exist", 404);
    }

    const storedOtp = await redisClient.get(`${OTP_PREFIX}${user.email}`);

    if (!storedOtp) {
        throw new AppError("OTP expired or not found", 400);
    }

    if (storedOtp !== data.otp.toString()) {
        throw new AppError("Invalid OTP", 400);
    }

    await redisClient.del(`${OTP_PREFIX}${user.email}`);

    const tokenPayload: TJwtPayload = {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
    };

    const resetToken = generateResetPassToken(tokenPayload);

    return { message: "OTP verified successfully", resetToken };
};

const resetPassword = async (data: ResetPasswordInput, userId: string) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    user.password = hashedPassword;
    await user.save();

    return { message: "Password reset successfully" };
};


export const AuthService = {
    register,
    login,
    changePassword,
    forgotPassword,
    verifyForgotPasswordOtp,
    resetPassword,
    getNewAccessToken
};
