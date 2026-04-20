import bcrypt from 'bcrypt';
import { AppError } from "../../errors/AppError";
import { env } from "../../config/env";
import { generateAccessToken, generateRefreshToken, generateResetPassToken, verifyRefreshToken, verifyResetToken, TJwtPayload } from "../../utils/jwt";
import { User } from '../user/user.model';
import { sendEmail } from '../../utils/sendEmail';
import { generatePasswordResetEmailHTML } from '../../utils/emailHTMLtext';
import type { LoginInput, ChangePasswordInput, ForgotPasswordInput, ResetPasswordInput } from "./auth.validation";

const login = async (data: LoginInput) => {
    const user = await User.findOne({
        email: data.email,
    }).select('+password _id name email role avatar status isDeleted');

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    if (user.isDeleted) {
        throw new AppError("This account has been deleted", 403);
    }

    if (user.status !== "ACTIVE") {
        throw new AppError("Your account is not active", 403);
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

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    return {
        accessToken,
        refreshToken,
        user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
};

const changePassword = async (userId: string, data: ChangePasswordInput) => {
    const user = await User.findById(userId).select('+password');

    if (!user) {
        throw new AppError("User not found", 404);
    }

    if (!user.password) {
        throw new AppError("Password not set for this account", 400);
    }

    const isOldPasswordValid = await bcrypt.compare(data.oldPassword, user.password);

    if (!isOldPasswordValid) {
        throw new AppError("Current password is incorrect", 401);
    }

    // Prevent setting same password
    const isSamePassword = await bcrypt.compare(data.newPassword, user.password);
    if (isSamePassword) {
        throw new AppError("New password must be different from the current password", 400);
    }

    user.password = data.newPassword; // Will be hashed by pre-save hook
    await user.save();

    return { message: "Password changed successfully" };
};

const forgotPassword = async (data: ForgotPasswordInput) => {
    const user = await User.findOne({ email: data.email });

    if (!user) {
        // Don't reveal whether email exists — security best practice
        return { message: "If this email is registered, you will receive a password reset link" };
    }

    if (user.isDeleted) {
        return { message: "If this email is registered, you will receive a password reset link" };
    }

    const tokenPayload: TJwtPayload = {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
    };

    const resetToken = generateResetPassToken(tokenPayload);
    const resetLink = `${env.CLIENT_URL}/reset-password?token=${resetToken}`;

    const emailHTML = generatePasswordResetEmailHTML(resetLink);
    await sendEmail(user.email, emailHTML, "Password Reset - Family JV International");

    return { message: "If this email is registered, you will receive a password reset link" };
};

const resetPassword = async (data: ResetPasswordInput) => {
    const decoded = verifyResetToken(data.token);

    const user = await User.findById(decoded.userId).select('+password');

    if (!user) {
        throw new AppError("Invalid or expired reset token", 400);
    }

    if (user.isDeleted) {
        throw new AppError("This account has been deleted", 403);
    }

    user.password = data.newPassword; // Will be hashed by pre-save hook
    await user.save();

    return { message: "Password reset successfully" };
};

const refreshToken = async (token: string) => {
    if (!token) {
        throw new AppError("Refresh token is required", 401);
    }

    const decoded = verifyRefreshToken(token);

    const user = await User.findById(decoded.userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    if (user.isDeleted) {
        throw new AppError("This account has been deleted", 403);
    }

    if (user.status !== "ACTIVE") {
        throw new AppError("Your account is not active", 403);
    }

    const tokenPayload: TJwtPayload = {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
    };

    const newAccessToken = generateAccessToken(tokenPayload);

    return {
        accessToken: newAccessToken,
    };
};

export const AuthService = {
    login,
    changePassword,
    forgotPassword,
    resetPassword,
    refreshToken,
};
