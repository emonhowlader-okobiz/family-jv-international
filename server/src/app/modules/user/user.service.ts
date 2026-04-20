import { AppError } from "../../errors/AppError";
import { User, UserRole, Host } from "../../models";
import type { UpdateProfileInput, UpdateRoleInput, UpdateStatusInput } from "./user.validation";
import { TPaginationOptions } from "../../types/pagination";
import { calculatePagination } from "../../utils/calculatePagination";
import { deleteImage, extractPublicId, uploadSingleImage } from "../../config/cloudinary";

const getProfile = async (userId: string) => {
    const user = await User.findOne({ _id: userId, isDeleted: false })
        .select('_id name email phone avatar role status isVerified createdAt updatedAt')
        .populate('hostProfile', '_id businessName nidNumber isApproved approvedAt createdAt');

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
        status: user.status,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        hostProfile: user.hostProfile ? {
            id: (user.hostProfile as any)._id.toString(),
            businessName: (user.hostProfile as any).businessName,
            nidNumber: (user.hostProfile as any).nidNumber,
            isApproved: (user.hostProfile as any).isApproved,
            approvedAt: (user.hostProfile as any).approvedAt,
            createdAt: (user.hostProfile as any).createdAt,
        } : null,
    };
};

const updateProfile = async (
    userId: string,
    data: UpdateProfileInput,
    file?: Express.Multer.File
) => {
    const user = await User.findById(userId).select('_id avatar');

    if (!user) throw new AppError("User not found", 404);

    let avatarUrl = user.avatar;
    let newPublicId: string | null = null;

    // Upload new avatar if provided
    if (file) {
        const { secure_url, public_id } = await uploadSingleImage(file);
        avatarUrl = secure_url;
        newPublicId = public_id;
    }

    // Update user profile
    user.name = data.name;
    user.phone = data.phone;
    user.avatar = avatarUrl;
    await user.save();

    // Delete old avatar if replaced
    if (file && user.avatar) {
        const oldPublicId = extractPublicId(user.avatar);
        if (oldPublicId && oldPublicId !== newPublicId) {
            await deleteImage(oldPublicId).catch(err =>
                console.error("Failed to delete old avatar:", err)
            );
        }
    }

    return user;
};


const deleteAccount = async (userId: string) => {
    const user = await User.findById(userId).select('_id isDeleted');

    if (!user) {
        throw new AppError("User not found", 404);
    }

    if (user.isDeleted) {
        throw new AppError("User account already deleted", 400);
    }

    user.isDeleted = true;
    await user.save();

    return { message: "Account deleted successfully" };
};

const getUsers = async (
    filters: { role?: string; status?: string },
    options: TPaginationOptions
) => {
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);

    const where: any = { isDeleted: false };

    if (filters.role) {
        where.role = filters.role;
    }

    if (filters.status) {
        where.status = filters.status;
    }

    const total = await User.countDocuments(where);
    const users = await User.find(where)
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortOrder })
        .select('_id name email phone avatar role status isVerified createdAt');

    return { users: users.map(u => ({ id: u._id.toString(), ...u.toObject() })), total, page, limit };
};

const getUserById = async (id: string) => {
    const user = await User.findById(id)
        .populate('hostProfile', '_id businessName nidNumber isApproved approvedAt createdAt')
        .select('_id name email phone avatar role status isVerified isDeleted createdAt updatedAt');

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
        status: user.status,
        isVerified: user.isVerified,
        isDeleted: user.isDeleted,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        hostProfile: user.hostProfile ? {
            id: (user.hostProfile as any)._id.toString(),
            businessName: (user.hostProfile as any).businessName,
            nidNumber: (user.hostProfile as any).nidNumber,
            isApproved: (user.hostProfile as any).isApproved,
            approvedAt: (user.hostProfile as any).approvedAt,
            createdAt: (user.hostProfile as any).createdAt,
        } : null,
    };
};

const updateUserStatus = async (userId: string, data: UpdateStatusInput) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    user.status = data.status as UserStatus;
    await user.save();

    return user;
};

const updateUserRole = async (userId: string, data: UpdateRoleInput) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    let hostProfile = await Host.findOne({ userId });

    if (data.role === UserRole.HOST && !hostProfile) {
        hostProfile = new Host({ userId, businessName: null, nidNumber: null });
        await hostProfile.save();
    }

    user.role = data.role as UserRole;
    await user.save();

    return { user, hostProfile };
};

const deleteUser = async (userId: string) => {
    const user = await User.findById(userId).select('_id isDeleted');

    if (!user) {
        throw new AppError("User not found", 404);
    }

    if (user.isDeleted) {
        throw new AppError("User account already deleted", 400);
    }

    user.isDeleted = true;
    await user.save();

    return { message: "User deleted successfully" };
};

export const UserService = {
    getProfile,
    updateProfile,
    deleteAccount,
    getUsers,
    getUserById,
    updateUserStatus,
    updateUserRole,
    deleteUser,
};
