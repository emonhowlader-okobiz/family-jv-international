import { AppError } from "../../errors/AppError";
import { Product } from "./product.model";
import { Category } from "../category/category.model";
import { uploadMultipleImages, uploadSingleImage, deleteImage, extractPublicId } from "../../config/cloudinary";
import { calculatePagination } from "../../utils/calculatePagination";
import type { TPaginationOptions } from "../../types/pagination";
import type { CreateProductInput, UpdateProductInput } from "./product.validation";

const generateSlug = (name: string): string => {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
};

const createProduct = async (data: CreateProductInput, files?: Express.Multer.File[]) => {
    // Validate category exists & matches type
    const category = await Category.findById(data.category);
    if (!category) {
        throw new AppError("Category not found", 404);
    }
    if (category.type !== data.type) {
        throw new AppError(
            `Category type mismatch: category is "${category.type}" but product type is "${data.type}"`,
            400
        );
    }

    // Generate unique slug
    let slug = generateSlug(data.name);
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
        slug = `${slug}-${Date.now()}`;
    }

    // Upload images to Cloudinary
    let images: string[] = [];
    if (files && files.length > 0) {
        const uploadResults = await uploadMultipleImages(files);
        images = uploadResults
            .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
            .map((r) => r.value.secure_url || r.value.url)
            .filter(Boolean);
    }

    const product = await Product.create({
        ...data,
        slug,
        images,
        thumbnail: images[0] || undefined,
    });

    return product;
};

const getAllProducts = async (
    query: Record<string, unknown>,
    paginationOptions: TPaginationOptions
) => {
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);

    const filter: Record<string, unknown> = {};

    if (query.type) filter.type = query.type;
    if (query.category) filter.category = query.category;
    if (query.isAvailable !== undefined) filter.isAvailable = query.isAvailable === "true";
    if (query.isFeatured !== undefined) filter.isFeatured = query.isFeatured === "true";
    if (query.search) {
        filter.$or = [
            { name: new RegExp(query.search as string, "i") },
            { description: new RegExp(query.search as string, "i") },
        ];
    }

    const [products, total] = await Promise.all([
        Product.find(filter)
            .populate("category", "name slug type")
            .sort({ sortOrder: 1, [sortBy]: sortOrder === "desc" ? -1 : 1 })
            .skip(skip)
            .limit(limit),
        Product.countDocuments(filter),
    ]);

    return {
        data: products,
        meta: { page, limit, total },
    };
};

const getFeaturedProducts = async () => {
    const products = await Product.find({
        isFeatured: true,
        isAvailable: true,
    })
        .populate("category", "name slug type")
        .sort({ sortOrder: 1, createdAt: -1 })
        .limit(12);

    return products;
};

const getProductById = async (idOrSlug: string) => {
    // Try to find by ID first, then by slug
    let product = null;

    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
        product = await Product.findById(idOrSlug)
            .populate("category", "name slug type description");
    }

    if (!product) {
        product = await Product.findOne({ slug: idOrSlug })
            .populate("category", "name slug type description");
    }

    if (!product) {
        throw new AppError("Product not found", 404);
    }

    return product;
};

const updateProduct = async (
    id: string,
    data: UpdateProductInput,
    files?: Express.Multer.File[]
) => {
    const product = await Product.findById(id);
    if (!product) {
        throw new AppError("Product not found", 404);
    }

    // Validate category if changing
    if (data.category) {
        const category = await Category.findById(data.category);
        if (!category) {
            throw new AppError("Category not found", 404);
        }
        if (category.type !== product.type) {
            throw new AppError(
                `Category type mismatch: category is "${category.type}" but product type is "${product.type}"`,
                400
            );
        }
    }

    const updateData: Record<string, unknown> = { ...data };

    // Regenerate slug if name changes
    if (data.name) {
        let slug = generateSlug(data.name);
        const existingProduct = await Product.findOne({ slug, _id: { $ne: id } });
        if (existingProduct) {
            slug = `${slug}-${Date.now()}`;
        }
        updateData.slug = slug;
    }

    // Upload new images if provided
    if (files && files.length > 0) {
        const uploadResults = await uploadMultipleImages(files);
        const newImages = uploadResults
            .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
            .map((r) => r.value.secure_url || r.value.url)
            .filter(Boolean);

        // Append new images to existing ones
        updateData.images = [...product.images, ...newImages];
        if (!product.thumbnail && newImages.length > 0) {
            updateData.thumbnail = newImages[0];
        }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    ).populate("category", "name slug type");

    return updatedProduct;
};

const removeProductImage = async (id: string, imageUrl: string) => {
    const product = await Product.findById(id);
    if (!product) {
        throw new AppError("Product not found", 404);
    }

    if (!product.images.includes(imageUrl)) {
        throw new AppError("Image not found on this product", 404);
    }

    // Delete from Cloudinary
    const publicId = extractPublicId(imageUrl);
    if (publicId) {
        await deleteImage(publicId);
    }

    // Remove from product
    product.images = product.images.filter((img) => img !== imageUrl);
    if (product.thumbnail === imageUrl) {
        product.thumbnail = product.images[0] || undefined;
    }
    await product.save();

    return product;
};

const deleteProduct = async (id: string) => {
    const product = await Product.findById(id);
    if (!product) {
        throw new AppError("Product not found", 404);
    }

    product.isDeleted = true;
    product.isAvailable = false;
    await product.save();

    return { message: "Product deleted successfully" };
};

export const ProductService = {
    createProduct,
    getAllProducts,
    getFeaturedProducts,
    getProductById,
    updateProduct,
    removeProductImage,
    deleteProduct,
};
