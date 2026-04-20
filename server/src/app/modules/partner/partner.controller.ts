import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PartnerService } from "./partner.service";
import pick from "../../utils/pick";

const createPartner = catchAsync(async (req: Request, res: Response) => {
    const file = req.file;
    const result = await PartnerService.createPartner(req.body, file);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Partner created successfully",
        data: result,
    });
});

const getAllPartners = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query as Record<string, unknown>, ["partnerType", "isActive", "search"]);
    const paginationOptions = pick(req.query as Record<string, unknown>, ["page", "limit", "sortBy", "sortOrder"]);

    const result = await PartnerService.getAllPartners(filters, paginationOptions);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Partners fetched successfully",
        meta: result.meta,
        data: result.data,
    });
});

const getActivePartners = catchAsync(async (req: Request, res: Response) => {
    const result = await PartnerService.getActivePartners();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Active partners fetched successfully",
        data: result,
    });
});

const getPartnerById = catchAsync(async (req: Request, res: Response) => {
    const result = await PartnerService.getPartnerById(req.params.id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Partner fetched successfully",
        data: result,
    });
});

const updatePartner = catchAsync(async (req: Request, res: Response) => {
    const file = req.file;
    const result = await PartnerService.updatePartner(req.params.id, req.body, file);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Partner updated successfully",
        data: result,
    });
});

const deletePartner = catchAsync(async (req: Request, res: Response) => {
    const result = await PartnerService.deletePartner(req.params.id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: result.message,
    });
});

export const PartnerController = {
    createPartner,
    getAllPartners,
    getActivePartners,
    getPartnerById,
    updatePartner,
    deletePartner,
};
