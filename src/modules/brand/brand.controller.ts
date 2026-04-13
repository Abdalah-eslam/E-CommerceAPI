import {brandsModel}  from "../../models/brand.model.js";
import type{ Request , Response } from "express";

 const getbrand = async(req :Request , res:Response ) => {
    const categories = await brandsModel.find()
    res.json({
        massage : "success",
        data : {categories}
    })
};
 const createbrand = async(req :Request , res:Response ) => {
    console.log(req.body);
    
    const category = await brandsModel.create(req.body)
    res.json({
        massage : "success",
        data : {category}
    })
};

 const deletebrand = async(req :Request , res:Response ) => {
    const category = await brandsModel.findByIdAndDelete(req.params.id)
    res.json({
        massage : "success",
        data : {category}
    })
};

 const updatebrand = async(req :Request , res:Response ) => {
    const category = await brandsModel.findByIdAndUpdate(req.params.id , req.body , {'returnDocument':'after'})
    res.json({
        massage : "success",
        data : {category}
    })
};
export default {getbrand , createbrand , deletebrand , updatebrand}