import mongoose, { Schema, Document } from 'mongoose';

export enum BannerSection {
    HOME_HERO = 'HOME_HERO',
    HOME_EXPORT = 'HOME_EXPORT',
    HOME_IMPORT = 'HOME_IMPORT',
    ABOUT = 'ABOUT',
    OTHER = 'OTHER',
}

export interface IBanner extends Document {
    title: string;
    subtitle?: string;
    image: string;
    link?: string;
    section: BannerSection;
    sortOrder: number;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const bannerSchema = new Schema<IBanner>(
    {
        title: { type: String, required: true, trim: true },
        subtitle: { type: String, trim: true },
        image: { type: String, required: true },
        link: { type: String, trim: true },
        section: {
            type: String,
            enum: Object.values(BannerSection),
            default: BannerSection.HOME_HERO,
        },
        sortOrder: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

bannerSchema.index({ section: 1, isActive: 1, sortOrder: 1 });

bannerSchema.pre('find', function () { this.where({ isDeleted: false }); });
bannerSchema.pre('findOne', function () { this.where({ isDeleted: false }); });
bannerSchema.pre('countDocuments', function () { this.where({ isDeleted: false }); });

export const Banner = mongoose.model<IBanner>('Banner', bannerSchema);
