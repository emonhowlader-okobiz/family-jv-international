import type { Request, Response, NextFunction } from "express";
import { TJwtPayload, verifyAccessToken } from "../utils/jwt";
import { AppError } from "../errors/AppError";
import { User, UserRole, UserStatus } from "../modules/user/user.model";

export const checkAuth =
    (...allowedRoles: UserRole[]) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                let token: string | undefined;

                if (req.headers.authorization?.startsWith("Bearer ")) {
                    token = req.headers.authorization.split(" ")[1];
                } else if (req.cookies?.accessToken) {
                    token = req.cookies.accessToken;
                }

                if (!token) {
                    throw new AppError("Unauthorized access", 401);
                }

                const decoded = verifyAccessToken(token as string);

                const user = await User.findById(decoded.userId);

                if (!user) {
                    throw new AppError("User does not exist", 404);
                }

                if (user.isDeleted) {
                    throw new AppError("This account has been deleted", 403);
                }

                if (user.status === UserStatus.SUSPENDED) {
                    throw new AppError("This account has been blocked", 403);
                }

                if (allowedRoles.length && !allowedRoles.includes(user.role)) {
                    throw new AppError("Forbidden access", 403);
                }

                req.authUser = {
                    userId: user._id.toString(),
                    email: user.email,
                    role: user.role,
                } as TJwtPayload

                next();
            } catch (error) {
                next(error);
            }
        };