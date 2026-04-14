    import type{ Request , Response , NextFunction } from "express";
    export const globalErrorHandler = (err:any , req:Request , res:Response , next:NextFunction) => {
            res.status(err.code || 500).json({massage :"failed",
            Error :err.message || "something went wrong"
        });
    }