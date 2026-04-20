import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BannerService } from "./banner.service";
import pick from "../../utils/pick";

const createBanner = catchAsync(async (req: Request, res: Response) => {
    const file = req.file;
    const result = await BannerService.createBanner(req.body, file);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Banner created successfully",
        data: result,
    });
});

const getAllBanners = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query as Record<string, unknown>, ["section", "isActive"]);
    const paginationOptions = pick(req.query as Record<string, unknown>, ["page", "limit", "sortBy", "sortOrder"]);

    const result = await BannerService.getAllBanners(filters, paginationOptions);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Banners fetched successfully",
        meta: result.meta,
        data: result.data,
    });
});

const getActiveBanners = catchAsync(async (req: Request, res: Response) => {
    const section = req.query.section as string | undefined;
    const result = await BannerService.getActiveBanners(section);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Active banners fetched successfully",
        data: result,
    });
});

const updateBanner = catchAsync(async (req: Request, res: Response) => {
    const file = req.file;
    const result = await BannerService.updateBanner(req.params.id, req.body, file);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Banner updated successfully",
        data: result,
    });
});

const deleteBanner = catchAsync(async (req: Request, res: Response) => {
    const result = await BannerService.deleteBanner(req.params.id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: result.message,
    });
});

export const BannerController = {
    createBanner,
    getAllBanners,
    getActiveBanners,
    updateBanner,
    deleteBanner,
};
