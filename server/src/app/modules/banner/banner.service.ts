import { AppError } from "../../errors/AppError";
import { Banner } from "./banner.model";
import { uploadSingleImage, deleteImage, extractPublicId } from "../../config/cloudinary";
import { calculatePagination } from "../../utils/calculatePagination";
import type { TPaginationOptions } from "../../types/pagination";
import type { CreateBannerInput, UpdateBannerInput } from "./banner.validation";

const createBanner = async (data: CreateBannerInput, file?: Express.Multer.File) => {
    if (!file) {
        throw new AppError("Banner image is required", 400);
    }

    const uploadResult = await uploadSingleImage(file);
    const imageUrl = uploadResult.secure_url || uploadResult.url;

    if (!imageUrl) {
        throw new AppError("Failed to upload banner image", 500);
    }

    const banner = await Banner.create({
        ...data,
        image: imageUrl,
    });

    return banner;
};

const getAllBanners = async (
    query: Record<string, unknown>,
    paginationOptions: TPaginationOptions
) => {
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);

    const filter: Record<string, unknown> = {};

    if (query.section) filter.section = query.section;
    if (query.isActive !== undefined) filter.isActive = query.isActive === "true";

    const [banners, total] = await Promise.all([
        Banner.find(filter)
            .sort({ sortOrder: 1, [sortBy]: sortOrder === "desc" ? -1 : 1 })
            .skip(skip)
            .limit(limit),
        Banner.countDocuments(filter),
    ]);

    return {
        data: banners,
        meta: { page, limit, total },
    };
};

const getActiveBanners = async (section?: string) => {
    const filter: Record<string, unknown> = { isActive: true };
    if (section) filter.section = section;

    const banners = await Banner.find(filter)
        .sort({ sortOrder: 1, createdAt: -1 });

    return banners;
};

const updateBanner = async (id: string, data: UpdateBannerInput, file?: Express.Multer.File) => {
    const banner = await Banner.findById(id);
    if (!banner) {
        throw new AppError("Banner not found", 404);
    }

    const updateData: Record<string, unknown> = { ...data };

    // Upload new image if provided
    if (file) {
        const uploadResult = await uploadSingleImage(file);
        const newImageUrl = uploadResult.secure_url || uploadResult.url;

        if (newImageUrl) {
            // Delete old image from Cloudinary
            const oldPublicId = extractPublicId(banner.image);
            if (oldPublicId) {
                try { await deleteImage(oldPublicId); } catch (e) { /* ignore */ }
            }
            updateData.image = newImageUrl;
        }
    }

    const updatedBanner = await Banner.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    return updatedBanner;
};

const deleteBanner = async (id: string) => {
    const banner = await Banner.findById(id);
    if (!banner) {
        throw new AppError("Banner not found", 404);
    }

    banner.isDeleted = true;
    banner.isActive = false;
    await banner.save();

    return { message: "Banner deleted successfully" };
};

export const BannerService = {
    createBanner,
    getAllBanners,
    getActiveBanners,
    updateBanner,
    deleteBanner,
};
