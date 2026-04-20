import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

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

export const UserController = {
    getMe
};
