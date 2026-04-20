import { z } from "zod";

const specificationSchema = z.object({
    key: z.string().min(1, "Specification key is required").trim(),
    value: z.string().min(1, "Specification value is required").trim(),
});

const createProductSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").trim(),
    description: z.string().min(10, "Description must be at least 10 characters"),
    shortDescription: z.string().trim().optional(),
    category: z.string().min(1, "Category is required"),
    type: z.enum(["EXPORT", "IMPORT"], { required_error: "Type is required" }),
    specifications: z.array(specificationSchema).optional(),
    origin: z.string().trim().optional(),
    minOrderQuantity: z.string().trim().optional(),
    unit: z.string().trim().optional(),
    isAvailable: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
    sortOrder: z.number().int().min(0).optional(),
});

const updateProductSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").trim().optional(),
    description: z.string().min(10, "Description must be at least 10 characters").optional(),
    shortDescription: z.string().trim().optional(),
    category: z.string().optional(),
    specifications: z.array(specificationSchema).optional(),
    origin: z.string().trim().optional(),
    minOrderQuantity: z.string().trim().optional(),
    unit: z.string().trim().optional(),
    isAvailable: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
    sortOrder: z.number().int().min(0).optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;

export const ProductValidation = {
    createProductSchema,
    updateProductSchema,
};
