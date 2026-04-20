import { User, UserRole, Auth, AuthProvider } from "../models";
import { env } from "../config/env";
import bcrypt from "bcrypt";

export const seedSuperAdmin = async () => {
    try {
        const isSuperAdminExist = await User.findOne({
            email: env.SUPER_ADMIN_EMAIL,
        });

        if (isSuperAdminExist) {
            console.log("Super Admin Already Exists!");
            return;
        }

        console.log("Trying to create Super Admin...");

        const hashedPassword = await bcrypt.hash(
            env.SUPER_ADMIN_PASSWORD,
            Number(env.BCRYPT_SALT_ROUNDS)
        );

        const superAdmin = new User({
            name: "Super admin",
            role: UserRole.SUPER_ADMIN,
            email: env.SUPER_ADMIN_EMAIL,
            password: hashedPassword,
            isVerified: true,
        });

        await superAdmin.save();

        const auth = new Auth({
            provider: AuthProvider.credentials,
            providerId: env.SUPER_ADMIN_EMAIL,
            userId: superAdmin._id.toString(),
        });

        await auth.save();

        console.log("Super Admin Created Successfully! \n");
        console.log(superAdmin);
    } catch (error) {
        console.log(error);
    }
};