import mongoose, { Schema, Document } from 'mongoose';

export enum CategoryType {
    EXPORT = 'EXPORT',
    IMPORT = 'IMPORT',
}

export interface ICategory extends Document {
    name: string;
    slug: string;
    type: CategoryType;
    description?: string;
    image?: string;
    sortOrder: number;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
    {
        name: { type: String, required: true, trim: true },
        slug: { type: String, required: true, lowercase: true, trim: true },
        type: {
            type: String,
            enum: Object.values(CategoryType),
            required: true,
        },
        description: { type: String, trim: true },
        image: { type: String },
        sortOrder: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// Compound unique index: same name can exist under different types
categorySchema.index({ name: 1, type: 1 }, { unique: true });
categorySchema.index({ slug: 1, type: 1 }, { unique: true });
categorySchema.index({ type: 1, isActive: 1 });

// Query middleware: exclude soft-deleted
categorySchema.pre('find', function () {
    this.where({ isDeleted: false });
});
categorySchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});
categorySchema.pre('countDocuments', function () {
    this.where({ isDeleted: false });
});

export const Category = mongoose.model<ICategory>('Category', categorySchema);
