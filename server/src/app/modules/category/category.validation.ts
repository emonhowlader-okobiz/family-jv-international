import { z } from "zod";

const createCategorySchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").trim(),
    type: z.enum(["EXPORT", "IMPORT"], { required_error: "Type is required (EXPORT or IMPORT)" }),
    description: z.string().trim().optional(),
    sortOrder: z.number().int().min(0).optional(),
    isActive: z.boolean().optional(),
});

const updateCategorySchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").trim().optional(),
    description: z.string().trim().optional(),
    sortOrder: z.number().int().min(0).optional(),
    isActive: z.boolean().optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

export const CategoryValidation = {
    createCategorySchema,
    updateCategorySchema,
};
