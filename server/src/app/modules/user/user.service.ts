import { AppError } from "../../errors/AppError";
// import { Host, User, UserRole } from "../../models";
import { User } from "./user.model";

const getProfile = async (userId: string) => {
    const user = await User.findOne({ _id: userId, isDeleted: false })
        .select('_id name email role status createdAt updatedAt')

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return {
        id: user._id.toString(),
        name: user.name,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};


export const UserService = {
    getProfile,
};
