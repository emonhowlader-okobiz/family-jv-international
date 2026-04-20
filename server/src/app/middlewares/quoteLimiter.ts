import rateLimit from "express-rate-limit";

export const quoteLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // limit each IP to 5 quote requests per hour
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many quote requests from this IP. Please try again later.",
    },
});
