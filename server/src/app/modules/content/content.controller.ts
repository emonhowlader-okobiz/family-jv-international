import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ContentService } from "./content.service";

const getAllContent = catchAsync(async (req: Request, res: Response) => {
    const result = await ContentService.getAllContent();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All content pages fetched successfully",
        data: result,
    });
});

const getPublishedContent = catchAsync(async (req: Request, res: Response) => {
    const result = await ContentService.getPublishedContent();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Published content fetched successfully",
        data: result,
    });
});

const getContentByKey = catchAsync(async (req: Request, res: Response) => {
    const result = await ContentService.getContentByKey(req.params.key);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Content fetched successfully",
        data: result,
    });
});

const upsertContent = catchAsync(async (req: Request, res: Response) => {
    const adminUserId = req.authUser.userId;
    const result = await ContentService.upsertContent(req.params.key, req.body, adminUserId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Content saved successfully",
        data: result,
    });
});

const deleteContent = catchAsync(async (req: Request, res: Response) => {
    const result = await ContentService.deleteContent(req.params.key);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: result.message,
    });
});

export const ContentController = {
    getAllContent,
    getPublishedContent,
    getContentByKey,
    upsertContent,
    deleteContent,
};
