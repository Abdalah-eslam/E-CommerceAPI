import { AsyncErrorHandle } from "../../middlewares/AsyncErrorHandle.js";
import {brandsModel}  from "../../models/brand.model.js";
import type{ NextFunction, Request , Response } from "express";

const getbrand = async(req :Request , res:Response ) => {
    const brand = await brandsModel.find()
    res.json({
        massage : "success",
        data : {brands: brand}
    })
};
const createbrand =AsyncErrorHandle( async(req :Request , res:Response , next:NextFunction) => {
console.log(req.body);
console.log(req.file);
console.log(req.files);
    const brand = await brandsModel.create({...req.body ,logo: req.file?.filename})
    
    res.json({
        massage : "success",
        data : {brand}
    })
});

const deletebrand = async(req :Request , res:Response ) => {
    const brand = await brandsModel.findByIdAndDelete(req.params.id)
    res.json({
        massage : "success",
        data : {brand}
    })
};
const updatebrand = AsyncErrorHandle( async(req :Request , res:Response ) => {
    const brand = await brandsModel.findByIdAndUpdate(req.params.id , req.body , {'returnDocument':'after'})
    res.json({
        massage : "success",
        data : {Brand: brand}
    })
});
export default {getbrand , createbrand , deletebrand , updatebrand}