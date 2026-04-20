import bcrypt from 'bcrypt';
import { AppError } from "../../errors/AppError";
// import { Auth, AuthProvider, User } from "../../models";
import { generateAccessToken, generateRefreshToken, TJwtPayload } from "../../utils/jwt";
import { User } from '../user/user.model';
import { LoginInput } from "./auth.validation";

const REFRESH_PREFIX = "refresh-token:";

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

    // const refreshMaxAge = parseTimeToMs(env.JWT_REFRESH_EXPIRES_IN);

    // // 🔄 Store refresh token for rotation
    // await redisClient.set(`${REFRESH_PREFIX}${user._id}`, refreshToken, {
    //     expiration: { type: "EX", value: refreshMaxAge },
    // });

    return {
        accessToken,
        refreshToken,
        user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role
        },
    };
};


export const AuthService = {
    login
};
