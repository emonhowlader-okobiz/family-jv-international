import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";
import pick from "../../utils/pick";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createUser(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User created successfully",
        data: result,
    });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query as Record<string, unknown>, ["search", "role", "status"]);
    const paginationOptions = pick(req.query as Record<string, unknown>, ["page", "limit", "sortBy", "sortOrder"]);

    const result = await UserService.getAllUsers(filters, paginationOptions);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Users fetched successfully",
        meta: result.meta,
        data: result.data,
    });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
    const userId = req.authUser.userId;
    const user = await UserService.getProfile(userId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User profile fetched successfully",
        data: user,
    });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
    const user = await UserService.getUserById(req.params.id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User fetched successfully",
        data: user,
    });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
    const userId = req.authUser.userId;
    const user = await UserService.updateProfile(userId, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Profile updated successfully",
        data: user,
    });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.updateUserStatus(req.params.id, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User status updated successfully",
        data: result,
    });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const currentUserId = req.authUser.userId;
    const result = await UserService.softDeleteUser(req.params.id, currentUserId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: result.message,
    });
});

export const UserController = {
    createUser,
    getAllUsers,
    getMe,
    getUserById,
    updateProfile,
    updateUserStatus,
    deleteUser,
};
