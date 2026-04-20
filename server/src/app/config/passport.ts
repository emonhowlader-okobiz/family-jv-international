import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { env } from "./env";
import { User, Auth, UserRole, UserStatus, AuthProvider } from "../models";
import { AppError } from "../errors/AppError";

export type UserWithAuths = InstanceType<typeof User> & { auths: InstanceType<typeof Auth>[] };

passport.use(
    new GoogleStrategy(
        {
            clientID: env.GOOGLE_CLIENT_ID || "",
            clientSecret: env.GOOGLE_CLIENT_SECRET || "",
            callbackURL: env.GOOGLE_CALLBACK_URL,
            passReqToCallback: true,
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                if (!profile.emails || profile.emails.length === 0) {
                    return done(new Error("No email found from Google account"), false);
                }

                const email = profile.emails[0].value;
                const name = profile.displayName || "Google User";
                const avatar =
                    profile.photos && profile.photos.length > 0
                        ? profile.photos[0].value
                        : undefined;
                const googleId = profile.id;

                let user = await User.findOne({ email }).populate('auths');

                if (user) {
                    if (user.isDeleted) {
                        return done(new AppError("This account has been deleted", 403), false);
                    }
                    if (user.status !== UserStatus.ACTIVE) {
                        return done(new AppError(`Account is ${user.status}`, 403), false);
                    }
                    if (!user.isVerified) {
                        return done(new AppError("Account email not verified", 403), false);
                    }

                    const existingAuth = (user as any).auths.find(
                        (auth: any) => auth.provider === AuthProvider.google
                    );
                    if (!existingAuth) {
                        const newAuth = new Auth({
                            provider: AuthProvider.google,
                            providerId: googleId,
                            userId: user._id.toString(),
                        });
                        await newAuth.save();
                    }

                    if (!user.avatar && avatar) {
                        user.avatar = avatar;
                        await user.save();
                    }

                    return done(null, user);
                } else {
                    const session = await User.startSession();
                    session.startTransaction();

                    try {
                        const newUser = new User({
                            name,
                            email,
                            role: UserRole.USER,
                            avatar,
                            isVerified: true,
                        });

                        await newUser.save({ session });

                        const newAuth = new Auth({
                            provider: AuthProvider.google,
                            providerId: googleId,
                            userId: newUser._id.toString(),
                        });

                        await newAuth.save({ session });

                        await session.commitTransaction();

                        const populatedUser = await User.findById(newUser._id).populate('auths');


                        if (!populatedUser) {
                            return done(new Error("User creation failed"), false);
                        }

                        return done(null, populatedUser);
                    } catch (error) {
                        await session.abortTransaction();
                        throw error;
                    } finally {
                        session.endSession();
                    }
                }
            } catch (error) {
                return done(error, false);
            }
        }
    )
);

export default passport;
