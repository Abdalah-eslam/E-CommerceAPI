import type { Request , Response , NextFunction} from "express";
import { AsyncErrorHandle } from "../../middlewares/AsyncErrorHandle";
import AppError from "../../utils/AppError";    
import { userModel } from "../../models/user.model";
import bcrypt from "bcryptjs";
import { genrateJWT } from "../../utils/genrateJWT";
const register = AsyncErrorHandle(async(req :Request , res:Response, next:NextFunction) => {
const isMatch = await userModel.findOne({email : req.body.email})
if (isMatch) throw new AppError('user already exist',409)
const user = await userModel.create({...req.body })
res.json({massage : "success" , data : user})
});


const login = (async(req :Request , res:Response, next:NextFunction) => {
    const user = await userModel.findOne({email : req.body.email})
    if (!user) throw new AppError('user not found',404)
    const isMatch = await bcrypt.compare(req.body.password , user.password as string)
    if (!isMatch) throw new AppError('wrong password',401)
    const token = genrateJWT({Id : user._id , role : user.role})
    req.cookies.jwt = token
    res.json({massage : "success" , data : user ,token})
});
const logout = async(req :Request , res:Response, next:NextFunction) => {
    res.clearCookie('jwt')
    res.json({massage : "success"})
};



export default {register , login , logout};