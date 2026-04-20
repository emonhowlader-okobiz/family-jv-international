import bcrypt from 'bcrypt';
import { User, UserRole, UserStatus } from '../modules/user/user.model';
import { Content } from '../modules/content/content.model';
import { env } from '../config/env';

export const seedAdmin = async () => {
    try {
        // ==========================================
        // 1. Seed Super Admin
        // ==========================================
        const existingAdmin = await User.findOne({
            role: UserRole.SUPER_ADMIN,
        });

        if (existingAdmin) {
            console.log('✅ Super admin already exists');
        } else {
            const hashedPassword = await bcrypt.hash(
                env.SUPER_ADMIN_PASSWORD,
                Number(env.BCRYPT_SALT_ROUNDS)
            );

            const admin = await User.create({
                name: 'Super Admin',
                email: env.SUPER_ADMIN_EMAIL,
                password: hashedPassword,
                role: UserRole.SUPER_ADMIN,
                status: UserStatus.ACTIVE,
            });

            console.log('🔥 Super admin created:', admin.email);
        }

        // ==========================================
        // 2. Seed Default Content Pages
        // ==========================================
        const defaultPages = [
            {
                key: 'about_us',
                title: 'About Us',
                body: '<p>Family JV International Business Ltd. is a leading export and import company based in Dhaka, Bangladesh. We specialize in high-quality jute and leather products, serving international markets with excellence and integrity.</p>',
                metadata: {
                    established: '2020',
                    headquarters: '50, Purana Paltan Line (2nd Floor), Paltan, Dhaka-1000',
                },
            },
            {
                key: 'mission',
                title: 'Our Mission',
                body: '<p>To deliver world-class export and import services, connecting Bangladeshi products with global markets while maintaining the highest standards of quality, sustainability, and customer satisfaction.</p>',
            },
            {
                key: 'vision',
                title: 'Our Vision',
                body: '<p>To become a globally recognized leader in the export and import industry, renowned for innovation, reliability, and commitment to fostering international trade relationships.</p>',
            },
            {
                key: 'contact_info',
                title: 'Contact Information',
                body: '<p>Get in touch with us for any inquiries about our export and import services.</p>',
                metadata: {
                    address: '50, Purana Paltan Line (2nd Floor), Paltan, Dhaka-1000',
                    phone: '01868355555',
                    email: env.SUPER_ADMIN_EMAIL,
                    whatsapp: '01868355555',
                },
            },
        ];

        for (const page of defaultPages) {
            const existing = await Content.findOne({ key: page.key });
            if (!existing) {
                await Content.create({
                    ...page,
                    isPublished: true,
                });
                console.log(`📄 Content page "${page.key}" seeded`);
            }
        }

        console.log('✅ Seed process complete');
    } catch (error) {
        console.error('❌ Error seeding data:', error);
    }
};