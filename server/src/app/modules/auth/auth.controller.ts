import { Request, Response } from 'express';
import { env } from '../../config/env';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { setAuthCookie } from '../../utils/setCookie';
import { AuthService } from './auth.service';
import { LoginInput } from './auth.validation';

const REFRESH_PREFIX = "refresh-token:";


const login = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.login(req.body as LoginInput);

    setAuthCookie(res, { accessToken: result.accessToken, refreshToken: result.refreshToken })

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Login successful',
        data: {
            accessToken: result.accessToken,
            user: result.user,
        },
    });
});

const logout = catchAsync(async (req: Request, res: Response) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: env.NODE_ENV === "production" ? "none" : "lax",
    });

    // // 🔄 Invalidate refresh token in Redis
    // if (req.authUser) {
    //     await redisClient.del(`${REFRESH_PREFIX}${(req.authUser as TJwtPayload).userId}`);
    // }

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Logged out successfully',
    });
});

export const AuthController = {
    login,
    logout
};
