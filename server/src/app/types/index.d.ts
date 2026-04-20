import type { UserRole } from "../models";

declare global {
    namespace Express {
        interface Request {
            authUser: {
                userId: string;
                email: string;
                role: UserRole;
            };
        }
    }
}

