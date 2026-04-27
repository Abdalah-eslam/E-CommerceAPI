import type { NextFunction , Request , Response} from "express";
import AppErorr from "../utils/AppError.js";
import { verifyJWT } from "../utils/JWT.js";

export const Protect = (req:Request , res:Response , next:NextFunction) =>{

    if (req.cookies.token ) 
    {
    const decoded = verifyJWT(req.cookies.token) as any
(req as any).user = decoded;
        next()
    }
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        const token = req.headers.authorization.split(' ')[1] as string
        const decoded = verifyJWT(token) as any
        (req as any).user = decoded
        next()
    }
    else 
    {
        next(new AppErorr('you are not logged in', 401))

    }
    
}