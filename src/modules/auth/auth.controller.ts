import type { Request , Response , NextFunction} from "express";
import { AsyncErrorHandle } from "../../middlewares/AsyncErrorHandle.js";
import AppError from "../../utils/AppError.js";    
import { userModel } from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import { genrateJWT } from "../../utils/JWT.js";
const register = AsyncErrorHandle(async(req :Request , res:Response, next:NextFunction) => {
const isMatch = await userModel.findOne({email : req.body.email})
if (isMatch) throw new AppError('user already exist',409)
req.body.addresses= JSON.parse(req.body.addresses)
const user = await userModel.create({...req.body })
res.json({massage : "success" , data : user})
});


const login = (async(req :Request , res:Response, next:NextFunction) => {
    const user = await userModel.findOne({email : req.body.email}).select('-wishlist -createdAt -updatedAt -__v -addresses')
    if (!user) return next(new AppError('user not found',404));
    const isMatch = await bcrypt.compare(req.body.password , user?.password as string)
    if (!isMatch) return next(new AppError('wrong password or Email',401))
    const token = genrateJWT({Id : user?._id , role : user?.role})
res.cookie("token",token , {
httpOnly: true,
  secure: true,      // في production HTTPS
sameSite: "strict"
});

    return res.json({massage : "success" , data : user ,token})
});
const logout = async(req :Request , res:Response, next:NextFunction) => {
    if (!req.cookies.token) return next(new AppError('you are not logged in',401))
    res.clearCookie('token')
    res.json({massage : "success"})
};



export default {register , login , logout};