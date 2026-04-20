import { AppError } from "../../errors/AppError";
import { Quote, QuoteStatus } from "./quote.model";
import { Counter } from "./counter.model";
import { Product } from "../product/product.model";
import { sendEmail } from "../../utils/sendEmail";
import {
    generateQuoteConfirmationEmailHTML,
    generateQuoteResponseEmailHTML,
    generateAdminQuoteNotificationEmailHTML,
} from "../../utils/emailHTMLtext";
import { env } from "../../config/env";
import { calculatePagination } from "../../utils/calculatePagination";
import type { TPaginationOptions } from "../../types/pagination";
import type { CreateQuoteInput, RespondToQuoteInput, UpdateQuoteStatusInput } from "./quote.validation";

/**
 * Generate a unique quote number using atomic counter.
 * Format: FJV-Q-YYYYMMDD-XXXX (e.g., FJV-Q-20260420-0001)
 */
const generateQuoteNumber = async (): Promise<string> => {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, "");
    const counterName = `quote-${dateStr}`;

    // Atomic increment — no race condition
    const counter = await Counter.findOneAndUpdate(
        { name: counterName },
        { $inc: { seq: 1 } },
        { upsert: true, new: true }
    );

    const seq = String(counter.seq).padStart(4, "0");
    return `FJV-Q-${dateStr}-${seq}`;
};

const createQuote = async (data: CreateQuoteInput) => {
    // Validate product if provided
    if (data.product) {
        const product = await Product.findById(data.product);
        if (!product) {
            throw new AppError("Product not found", 404);
        }
        // Ensure product type matches
        if (product.type !== data.productType) {
            throw new AppError(
                `Product type mismatch: product is "${product.type}" but selected type is "${data.productType}"`,
                400
            );
        }
    }

    const quoteNumber = await generateQuoteNumber();

    const quote = await Quote.create({
        ...data,
        quoteNumber,
    });

    // Send confirmation email to requester (fire-and-forget, don't block)
    try {
        const confirmationHTML = generateQuoteConfirmationEmailHTML(data.name, quoteNumber);
        await sendEmail(
            data.email,
            confirmationHTML,
            `Quote Request Received - ${quoteNumber} | Family JV International`
        );
    } catch (err) {
        console.error("Failed to send quote confirmation email:", err);
        // Don't fail the request if email fails
    }

    // Notify admin about new quote (fire-and-forget)
    try {
        const adminHTML = generateAdminQuoteNotificationEmailHTML(
            quoteNumber,
            data.name,
            data.productType
        );
        await sendEmail(
            env.SUPER_ADMIN_EMAIL,
            adminHTML,
            `🔔 New Quote Request: ${quoteNumber}`
        );
    } catch (err) {
        console.error("Failed to send admin notification email:", err);
    }

    return quote;
};

const getAllQuotes = async (
    query: Record<string, unknown>,
    paginationOptions: TPaginationOptions
) => {
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);

    const filter: Record<string, unknown> = {};

    if (query.status) filter.status = query.status;
    if (query.productType) filter.productType = query.productType;
    if (query.search) {
        const searchRegex = new RegExp(query.search as string, "i");
        filter.$or = [
            { name: searchRegex },
            { email: searchRegex },
            { quoteNumber: searchRegex },
            { company: searchRegex },
        ];
    }

    const [quotes, total] = await Promise.all([
        Quote.find(filter)
            .populate("product", "name slug type thumbnail")
            .populate("respondedBy", "name email")
            .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
            .skip(skip)
            .limit(limit),
        Quote.countDocuments(filter),
    ]);

    return {
        data: quotes,
        meta: { page, limit, total },
    };
};

const getQuoteById = async (id: string) => {
    const quote = await Quote.findById(id)
        .populate("product", "name slug type thumbnail images description")
        .populate("respondedBy", "name email");

    if (!quote) {
        throw new AppError("Quote not found", 404);
    }

    return quote;
};

const respondToQuote = async (id: string, data: RespondToQuoteInput, adminUserId: string) => {
    const quote = await Quote.findById(id);

    if (!quote) {
        throw new AppError("Quote not found", 404);
    }

    if (quote.status === QuoteStatus.CLOSED) {
        throw new AppError("Cannot respond to a closed quote", 400);
    }

    quote.adminResponse = data.adminResponse;
    if (data.adminNotes) quote.adminNotes = data.adminNotes;
    quote.status = QuoteStatus.RESPONDED;
    quote.respondedAt = new Date();
    quote.respondedBy = adminUserId as any;
    await quote.save();

    // Send response email to requester
    try {
        const responseHTML = generateQuoteResponseEmailHTML(
            quote.name,
            quote.quoteNumber,
            data.adminResponse
        );
        await sendEmail(
            quote.email,
            responseHTML,
            `Response to Your Quote Request - ${quote.quoteNumber} | Family JV International`
        );
    } catch (err) {
        console.error("Failed to send quote response email:", err);
    }

    return quote;
};

const updateQuoteStatus = async (id: string, data: UpdateQuoteStatusInput) => {
    const quote = await Quote.findById(id);

    if (!quote) {
        throw new AppError("Quote not found", 404);
    }

    quote.status = data.status as QuoteStatus;
    if (data.adminNotes) quote.adminNotes = data.adminNotes;
    await quote.save();

    return quote;
};

const getQuoteStats = async () => {
    const [total, pending, reviewed, responded, closed, exportQuotes, importQuotes] =
        await Promise.all([
            Quote.countDocuments({}),
            Quote.countDocuments({ status: QuoteStatus.PENDING }),
            Quote.countDocuments({ status: QuoteStatus.REVIEWED }),
            Quote.countDocuments({ status: QuoteStatus.RESPONDED }),
            Quote.countDocuments({ status: QuoteStatus.CLOSED }),
            Quote.countDocuments({ productType: "EXPORT" }),
            Quote.countDocuments({ productType: "IMPORT" }),
        ]);

    return {
        total,
        byStatus: { pending, reviewed, responded, closed },
        byType: { export: exportQuotes, import: importQuotes },
    };
};

const deleteQuote = async (id: string) => {
    const quote = await Quote.findById(id);

    if (!quote) {
        throw new AppError("Quote not found", 404);
    }

    quote.isDeleted = true;
    await quote.save();

    return { message: "Quote deleted successfully" };
};

export const QuoteService = {
    createQuote,
    getAllQuotes,
    getQuoteById,
    respondToQuote,
    updateQuoteStatus,
    getQuoteStats,
    deleteQuote,
};
