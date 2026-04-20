import { z } from "zod";

const upsertContentSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters").trim(),
    body: z.string().min(1, "Body content is required"),
    metadata: z.record(z.any()).optional(),
    isPublished: z.boolean().optional(),
});

export type UpsertContentInput = z.infer<typeof upsertContentSchema>;

export const ContentValidation = {
    upsertContentSchema,
};
