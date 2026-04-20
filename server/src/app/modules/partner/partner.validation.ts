import { z } from "zod";

const createPartnerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").trim(),
    country: z.string().trim().optional(),
    website: z.string().url("Invalid URL format").optional().or(z.literal("")),
    description: z.string().trim().optional(),
    partnerType: z.enum(["BUYER", "SUPPLIER", "DISTRIBUTOR", "OTHER"]).optional(),
    sortOrder: z.number().int().min(0).optional(),
    isActive: z.boolean().optional(),
});

const updatePartnerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").trim().optional(),
    country: z.string().trim().optional(),
    website: z.string().url("Invalid URL format").optional().or(z.literal("")),
    description: z.string().trim().optional(),
    partnerType: z.enum(["BUYER", "SUPPLIER", "DISTRIBUTOR", "OTHER"]).optional(),
    sortOrder: z.number().int().min(0).optional(),
    isActive: z.boolean().optional(),
});

export type CreatePartnerInput = z.infer<typeof createPartnerSchema>;
export type UpdatePartnerInput = z.infer<typeof updatePartnerSchema>;

export const PartnerValidation = {
    createPartnerSchema,
    updatePartnerSchema,
};
