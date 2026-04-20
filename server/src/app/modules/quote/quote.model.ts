import mongoose, { Schema, Document, Types } from 'mongoose';

export enum QuoteStatus {
    PENDING = 'PENDING',
    REVIEWED = 'REVIEWED',
    RESPONDED = 'RESPONDED',
    CLOSED = 'CLOSED',
}

export interface IQuote extends Document {
    quoteNumber: string;
    product?: Types.ObjectId;
    productType: 'EXPORT' | 'IMPORT';

    // Requester info
    name: string;
    email: string;
    phone: string;
    company?: string;
    country?: string;

    // Quote details
    message: string;
    quantity?: string;

    // Admin management
    status: QuoteStatus;
    adminNotes?: string;
    adminResponse?: string;
    respondedAt?: Date;
    respondedBy?: Types.ObjectId;

    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const quoteSchema = new Schema<IQuote>(
    {
        quoteNumber: { type: String, required: true, unique: true },
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        productType: {
            type: String,
            enum: ['EXPORT', 'IMPORT'],
            required: true,
        },

        // Requester info
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, lowercase: true, trim: true },
        phone: { type: String, required: true, trim: true },
        company: { type: String, trim: true },
        country: { type: String, trim: true },

        // Quote details
        message: { type: String, required: true },
        quantity: { type: String, trim: true },

        // Admin management
        status: {
            type: String,
            enum: Object.values(QuoteStatus),
            default: QuoteStatus.PENDING,
        },
        adminNotes: { type: String },
        adminResponse: { type: String },
        respondedAt: { type: Date },
        respondedBy: { type: Schema.Types.ObjectId, ref: 'User' },

        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// Indexes
quoteSchema.index({ quoteNumber: 1 });
quoteSchema.index({ status: 1, productType: 1 });
quoteSchema.index({ email: 1 });
quoteSchema.index({ createdAt: -1 });

// Query middleware: exclude soft-deleted
quoteSchema.pre('find', function () {
    this.where({ isDeleted: false });
});
quoteSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});
quoteSchema.pre('countDocuments', function () {
    this.where({ isDeleted: false });
});

export const Quote = mongoose.model<IQuote>('Quote', quoteSchema);
