import bcrypt from 'bcrypt';
import { User, UserRole, UserStatus } from '../modules/user/user.model';
import { env } from '../config/env';

export const seedAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({
            role: UserRole.SUPER_ADMIN,
        });

        if (existingAdmin) {
            console.log('✅ Super admin already exists');
            return;
        }

        const hashedPassword = await bcrypt.hash(
            env.SUPER_ADMIN_PASSWORD,
            Number(env.BCRYPT_SALT_ROUNDS)
        );

        const admin = await User.create({
            name: 'Super Admin',
            email: 'admin@example.com',
            password: hashedPassword,
            role: UserRole.SUPER_ADMIN,
            status: UserStatus.ACTIVE,
        });

        console.log('🔥 Super admin created:', admin.email);
    } catch (error) {
        console.error('❌ Error seeding admin:', error);
    }
};