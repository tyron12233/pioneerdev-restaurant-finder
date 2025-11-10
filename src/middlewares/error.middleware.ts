import type { Request, Response, NextFunction } from 'express';

interface ApiError extends Error {
    statusCode?: number;
    details?: any;
}

export const errorHandler = (
    error: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const statusCode = error.statusCode || 500;
    const response = {
        message: error.message || 'Internal Server Error',
        details: error.details || null,
    };

    res.status(statusCode).json({
        success: false,
        error: {
            message: response.message,
            details: response.details,
        }
    });
}