import { Request, Response } from 'express';
import { env } from '../../config/env';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { setAuthCookie } from '../../utils/setCookie';
import { AuthService } from './auth.service';
import type { LoginInput, ChangePasswordInput, ForgotPasswordInput, ResetPasswordInput } from './auth.validation';

const login = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.login(req.body as LoginInput);

    setAuthCookie(res, { accessToken: result.accessToken, refreshToken: result.refreshToken });

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

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Logged out successfully',
    });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
    const userId = req.authUser.userId;
    const result = await AuthService.changePassword(userId, req.body as ChangePasswordInput);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: result.message,
    });
});

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.forgotPassword(req.body as ForgotPasswordInput);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: result.message,
    });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.resetPassword(req.body as ResetPasswordInput);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: result.message,
    });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;
    const result = await AuthService.refreshToken(token);

    setAuthCookie(res, { accessToken: result.accessToken });

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Token refreshed successfully',
        data: {
            accessToken: result.accessToken,
        },
    });
});

export const AuthController = {
    login,
    logout,
    changePassword,
    forgotPassword,
    resetPassword,
    refreshToken,
};
