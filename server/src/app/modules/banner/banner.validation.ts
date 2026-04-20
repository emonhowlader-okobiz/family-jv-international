import { z } from "zod";

const createBannerSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters").trim(),
    subtitle: z.string().trim().optional(),
    link: z.string().url("Invalid URL format").optional().or(z.literal("")),
    section: z.enum(["HOME_HERO", "HOME_EXPORT", "HOME_IMPORT", "ABOUT", "OTHER"]).optional(),
    sortOrder: z.number().int().min(0).optional(),
    isActive: z.boolean().optional(),
});

const updateBannerSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters").trim().optional(),
    subtitle: z.string().trim().optional(),
    link: z.string().url("Invalid URL format").optional().or(z.literal("")),
    section: z.enum(["HOME_HERO", "HOME_EXPORT", "HOME_IMPORT", "ABOUT", "OTHER"]).optional(),
    sortOrder: z.number().int().min(0).optional(),
    isActive: z.boolean().optional(),
});

export type CreateBannerInput = z.infer<typeof createBannerSchema>;
export type UpdateBannerInput = z.infer<typeof updateBannerSchema>;

export const BannerValidation = {
    createBannerSchema,
    updateBannerSchema,
};
