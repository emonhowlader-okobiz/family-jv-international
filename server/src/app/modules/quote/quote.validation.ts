import { z } from "zod";

const createQuoteSchema = z.object({
    product: z.string().optional(),
    productType: z.enum(["EXPORT", "IMPORT"], { required_error: "Product type is required" }),
    name: z.string().min(2, "Name must be at least 2 characters").trim(),
    email: z.string().email("Invalid email address").trim().toLowerCase(),
    phone: z.string().min(5, "Phone number is required").trim(),
    company: z.string().trim().optional(),
    country: z.string().trim().optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
    quantity: z.string().trim().optional(),
});

const respondToQuoteSchema = z.object({
    adminResponse: z.string().min(5, "Response must be at least 5 characters"),
    adminNotes: z.string().optional(),
});

const updateQuoteStatusSchema = z.object({
    status: z.enum(["PENDING", "REVIEWED", "RESPONDED", "CLOSED"]),
    adminNotes: z.string().optional(),
});

export type CreateQuoteInput = z.infer<typeof createQuoteSchema>;
export type RespondToQuoteInput = z.infer<typeof respondToQuoteSchema>;
export type UpdateQuoteStatusInput = z.infer<typeof updateQuoteStatusSchema>;

export const QuoteValidation = {
    createQuoteSchema,
    respondToQuoteSchema,
    updateQuoteStatusSchema,
};
