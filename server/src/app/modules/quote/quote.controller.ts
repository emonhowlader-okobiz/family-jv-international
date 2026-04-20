import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { QuoteService } from "./quote.service";
import pick from "../../utils/pick";

const createQuote = catchAsync(async (req: Request, res: Response) => {
    const result = await QuoteService.createQuote(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Quote request submitted successfully. A confirmation email has been sent.",
        data: {
            quoteNumber: result.quoteNumber,
        },
    });
});

const getAllQuotes = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query as Record<string, unknown>, [
        "status", "productType", "search",
    ]);
    const paginationOptions = pick(req.query as Record<string, unknown>, [
        "page", "limit", "sortBy", "sortOrder",
    ]);

    const result = await QuoteService.getAllQuotes(filters, paginationOptions);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Quotes fetched successfully",
        meta: result.meta,
        data: result.data,
    });
});

const getQuoteStats = catchAsync(async (req: Request, res: Response) => {
    const result = await QuoteService.getQuoteStats();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Quote statistics fetched successfully",
        data: result,
    });
});

const getQuoteById = catchAsync(async (req: Request, res: Response) => {
    const result = await QuoteService.getQuoteById(req.params.id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Quote fetched successfully",
        data: result,
    });
});

const respondToQuote = catchAsync(async (req: Request, res: Response) => {
    const adminUserId = req.authUser.userId;
    const result = await QuoteService.respondToQuote(req.params.id, req.body, adminUserId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Quote response sent successfully",
        data: result,
    });
});

const updateQuoteStatus = catchAsync(async (req: Request, res: Response) => {
    const result = await QuoteService.updateQuoteStatus(req.params.id, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Quote status updated successfully",
        data: result,
    });
});

const deleteQuote = catchAsync(async (req: Request, res: Response) => {
    const result = await QuoteService.deleteQuote(req.params.id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: result.message,
    });
});

export const QuoteController = {
    createQuote,
    getAllQuotes,
    getQuoteStats,
    getQuoteById,
    respondToQuote,
    updateQuoteStatus,
    deleteQuote,
};
