import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

const changePasswordSchema = z.object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z
        .string()
        .min(6, "New password must be at least 6 characters"),
});

const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});

const resetPasswordSchema = z.object({
    token: z.string().min(1, "Token is required"),
    newPassword: z
        .string()
        .min(6, "New password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const AuthValidation = {
    loginSchema,
    changePasswordSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
};