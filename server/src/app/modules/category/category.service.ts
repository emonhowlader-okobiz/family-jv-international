import { AppError } from "../../errors/AppError";
import { Category } from "./category.model";
import { calculatePagination } from "../../utils/calculatePagination";
import type { TPaginationOptions } from "../../types/pagination";
import type { CreateCategoryInput, UpdateCategoryInput } from "./category.validation";

const generateSlug = (name: string): string => {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
};

const createCategory = async (data: CreateCategoryInput) => {
    const slug = generateSlug(data.name);

    const category = await Category.create({
        ...data,
        slug,
    });

    return category;
};

const getAllCategories = async (
    query: Record<string, unknown>,
    paginationOptions: TPaginationOptions
) => {
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);

    const filter: Record<string, unknown> = {};

    if (query.type) filter.type = query.type;
    if (query.isActive !== undefined) filter.isActive = query.isActive === "true";
    if (query.search) {
        filter.name = new RegExp(query.search as string, "i");
    }

    const [categories, total] = await Promise.all([
        Category.find(filter)
            .sort({ sortOrder: 1, [sortBy]: sortOrder === "desc" ? -1 : 1 })
            .skip(skip)
            .limit(limit),
        Category.countDocuments(filter),
    ]);

    return {
        data: categories,
        meta: { page, limit, total },
    };
};

const getCategoryById = async (id: string) => {
    const category = await Category.findById(id);

    if (!category) {
        throw new AppError("Category not found", 404);
    }

    return category;
};

const updateCategory = async (id: string, data: UpdateCategoryInput) => {
    const updateData: Record<string, unknown> = { ...data };

    // Regenerate slug if name changes
    if (data.name) {
        updateData.slug = generateSlug(data.name);
    }

    const category = await Category.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    if (!category) {
        throw new AppError("Category not found", 404);
    }

    return category;
};

const deleteCategory = async (id: string) => {
    const category = await Category.findById(id);

    if (!category) {
        throw new AppError("Category not found", 404);
    }

    // Check if category has products before deleting
    // Lazy import to avoid circular dependency
    const { Product } = await import("../product/product.model");
    const productCount = await Product.countDocuments({ category: id, isDeleted: false });

    if (productCount > 0) {
        throw new AppError(
            `Cannot delete category: ${productCount} product(s) are still assigned to it. Remove or reassign them first.`,
            400
        );
    }

    category.isDeleted = true;
    category.isActive = false;
    await category.save();

    return { message: "Category deleted successfully" };
};

export const CategoryService = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
