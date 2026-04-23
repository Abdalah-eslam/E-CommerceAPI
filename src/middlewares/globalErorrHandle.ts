    import type{ Request , Response , NextFunction } from "express";
    export const globalErrorHandler = (err:any , req:Request , res:Response , next:NextFunction) => {
        let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

  // handle Mongo duplicate key
    if (err.code === 11000) {
    statusCode = 409; // Conflict
    message = "Duplicate field value entered";
    }
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map((e: any) => e.message).join(', ');
    }
    
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }
    
    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }
    
    if (err.name === 'CastError') {
        statusCode = 400;
        message = `Invalid ${err.path}`;
    }

    res.status(statusCode).json({
    success: false,
    message,
    });
    }