import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IProductSpecification {
    key: string;
    value: string;
}

export interface IProduct extends Document {
    name: string;
    slug: string;
    description: string;
    shortDescription?: string;
    category: Types.ObjectId;
    type: 'EXPORT' | 'IMPORT';
    images: string[];
    thumbnail?: string;
    specifications: IProductSpecification[];
    origin?: string;
    minOrderQuantity?: string;
    unit?: string;
    isAvailable: boolean;
    isFeatured: boolean;
    sortOrder: number;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const productSpecificationSchema = new Schema<IProductSpecification>(
    {
        key: { type: String, required: true, trim: true },
        value: { type: String, required: true, trim: true },
    },
    { _id: false }
);

const productSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true, trim: true },
        slug: { type: String, required: true, lowercase: true, trim: true },
        description: { type: String, required: true },
        shortDescription: { type: String, trim: true },
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
        type: {
            type: String,
            enum: ['EXPORT', 'IMPORT'],
            required: true,
        },
        images: [{ type: String }],
        thumbnail: { type: String },
        specifications: [productSpecificationSchema],
        origin: { type: String, trim: true },
        minOrderQuantity: { type: String, trim: true },
        unit: { type: String, trim: true },
        isAvailable: { type: Boolean, default: true },
        isFeatured: { type: Boolean, default: false },
        sortOrder: { type: Number, default: 0 },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// Indexes
productSchema.index({ slug: 1 }, { unique: true });
productSchema.index({ type: 1, category: 1 });
productSchema.index({ isFeatured: 1, isAvailable: 1 });
productSchema.index({ name: 'text', description: 'text' });

// Query middleware: exclude soft-deleted
productSchema.pre('find', function () {
    this.where({ isDeleted: false });
});
productSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});
productSchema.pre('countDocuments', function () {
    this.where({ isDeleted: false });
});

export const Product = mongoose.model<IProduct>('Product', productSchema);
