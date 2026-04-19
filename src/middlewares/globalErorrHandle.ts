    import type{ Request , Response , NextFunction } from "express";
    export const globalErrorHandler = (err:any , req:Request , res:Response , next:NextFunction) => {
        let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

  // handle Mongo duplicate key
    if (err.code === 11000) {
    statusCode = 409; // Conflict
    message = "Duplicate field value entered";
    }

    res.status(statusCode).json({
    success: false,
    message,
    });
    }