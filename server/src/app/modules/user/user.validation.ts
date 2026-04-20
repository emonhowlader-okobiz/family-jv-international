import { z } from "zod";

const createUserSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").trim(),
    email: z.string().email("Invalid email address").trim().toLowerCase(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().optional(),
    role: z.enum(["ADMIN", "SUPER_ADMIN"]).optional(),
});

const updateProfileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").trim().optional(),
    phone: z.string().optional(),
});

const updateStatusSchema = z.object({
    status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;

export const UserValidation = {
    createUserSchema,
    updateProfileSchema,
    updateStatusSchema,
};
