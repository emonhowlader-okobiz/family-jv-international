import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductService } from "./product.service";
import pick from "../../utils/pick";

const createProduct = catchAsync(async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[] | undefined;
    const result = await ProductService.createProduct(req.body, files);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Product created successfully",
        data: result,
    });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query as Record<string, unknown>, [
        "type", "category", "isAvailable", "isFeatured", "search",
    ]);
    const paginationOptions = pick(req.query as Record<string, unknown>, [
        "page", "limit", "sortBy", "sortOrder",
    ]);

    const result = await ProductService.getAllProducts(filters, paginationOptions);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Products fetched successfully",
        meta: result.meta,
        data: result.data,
    });
});

const getFeaturedProducts = catchAsync(async (req: Request, res: Response) => {
    const result = await ProductService.getFeaturedProducts();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Featured products fetched successfully",
        data: result,
    });
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
    const result = await ProductService.getProductById(req.params.idOrSlug);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Product fetched successfully",
        data: result,
    });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[] | undefined;
    const result = await ProductService.updateProduct(req.params.id, req.body, files);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Product updated successfully",
        data: result,
    });
});

const removeProductImage = catchAsync(async (req: Request, res: Response) => {
    const { imageUrl } = req.body;
    const result = await ProductService.removeProductImage(req.params.id, imageUrl);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Image removed successfully",
        data: result,
    });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
    const result = await ProductService.deleteProduct(req.params.id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: result.message,
    });
});

export const ProductController = {
    createProduct,
    getAllProducts,
    getFeaturedProducts,
    getProductById,
    updateProduct,
    removeProductImage,
    deleteProduct,
};
