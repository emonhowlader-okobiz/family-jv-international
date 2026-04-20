import { AppError } from "../../errors/AppError";
import { User, UserRole } from "./user.model";
import { calculatePagination } from "../../utils/calculatePagination";
import type { TPaginationOptions } from "../../types/pagination";
import type { CreateUserInput, UpdateProfileInput, UpdateStatusInput } from "./user.validation";

const createUser = async (data: CreateUserInput) => {
    const existingUser = await User.findOne({ email: data.email }).setOptions({ skipSoftDeleteFilter: true });

    if (existingUser) {
        throw new AppError("A user with this email already exists", 409);
    }

    const user = await User.create(data);

    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
    };
};

const getAllUsers = async (
    query: Record<string, unknown>,
    paginationOptions: TPaginationOptions
) => {
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);

    const filter: Record<string, unknown> = {};

    if (query.search) {
        const searchRegex = new RegExp(query.search as string, "i");
        filter.$or = [
            { name: searchRegex },
            { email: searchRegex },
        ];
    }
    if (query.role) filter.role = query.role;
    if (query.status) filter.status = query.status;

    const [users, total] = await Promise.all([
        User.find(filter)
            .select("-password")
            .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
            .skip(skip)
            .limit(limit),
        User.countDocuments(filter),
    ]);

    return {
        data: users,
        meta: { page, limit, total },
    };
};

const getProfile = async (userId: string) => {
    const user = await User.findById(userId)
        .select("-password");

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return user;
};

const getUserById = async (userId: string) => {
    const user = await User.findById(userId)
        .select("-password");

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return user;
};

const updateProfile = async (userId: string, data: UpdateProfileInput) => {
    const user = await User.findByIdAndUpdate(
        userId,
        { $set: data },
        { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return user;
};

const updateUserStatus = async (userId: string, data: UpdateStatusInput) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    // Prevent suspending SUPER_ADMIN
    if (user.role === UserRole.SUPER_ADMIN && data.status !== "ACTIVE") {
        throw new AppError("Cannot change Super Admin status", 403);
    }

    user.status = data.status as any;
    await user.save();

    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
    };
};

const softDeleteUser = async (userId: string, currentUserId: string) => {
    // Prevent self-deletion
    if (userId === currentUserId) {
        throw new AppError("You cannot delete your own account", 400);
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    // Prevent deleting SUPER_ADMIN
    if (user.role === UserRole.SUPER_ADMIN) {
        throw new AppError("Cannot delete Super Admin", 403);
    }

    user.isDeleted = true;
    user.status = "SUSPENDED" as any;
    await user.save();

    return { message: "User deleted successfully" };
};

export const UserService = {
    createUser,
    getAllUsers,
    getProfile,
    getUserById,
    updateProfile,
    updateUserStatus,
    softDeleteUser,
};
