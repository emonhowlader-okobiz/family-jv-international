import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IContent extends Document {
    key: string;
    title: string;
    body: string;
    metadata?: Record<string, any>;
    isPublished: boolean;
    updatedBy?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const contentSchema = new Schema<IContent>(
    {
        key: { type: String, required: true, unique: true, lowercase: true, trim: true },
        title: { type: String, required: true, trim: true },
        body: { type: String, required: true },
        metadata: { type: Schema.Types.Mixed, default: {} },
        isPublished: { type: Boolean, default: true },
        updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

contentSchema.index({ key: 1 }, { unique: true });
contentSchema.index({ isPublished: 1 });

export const Content = mongoose.model<IContent>('Content', contentSchema);
