import mongoose from "mongoose";

type TMongooseErrorResponse = {
    statusCode: number;
    message: string;
    errors?: {
        field: string;
        message: string;
    }[];
};

export const handleMongooseError = (
    error: unknown
): TMongooseErrorResponse | null => {
    // Mongoose Validation Error
    if (error instanceof mongoose.Error.ValidationError) {
        return {
            statusCode: 400,
            message: "Validation Error",
            errors: Object.values(error.errors).map(err => ({
                field: err.path,
                message: err.message,
            })),
        };
    }

    // Mongoose Cast Error (invalid ObjectId, etc.)
    if (error instanceof mongoose.Error.CastError) {
        return {
            statusCode: 400,
            message: "Invalid data format",
            errors: [
                {
                    field: error.path,
                    message: `Invalid ${error.kind}: ${error.value}`,
                },
            ],
        };
    }

    // Duplicate Key Error
    if (error && typeof error === 'object' && 'code' in error && (error as any).code === 11000) {
        const field = Object.keys((error as any).keyValue)[0];
        return {
            statusCode: 409,
            message: "Duplicate field value",
            errors: [
                {
                    field,
                    message: "This value already exists",
                },
            ],
        };
    }

    return null;
};
