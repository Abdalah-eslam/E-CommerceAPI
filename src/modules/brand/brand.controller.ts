import {brandsModel}  from "../../models/brand.model.js";
import type{ Request , Response } from "express";

const getbrand = async(req :Request , res:Response ) => {
    const brand = await brandsModel.find()
    res.json({
        massage : "success",
        data : {brands: brand}
    })
};
const createbrand = async(req :Request , res:Response ) => {
    const brand = await brandsModel.create({...req.body ,logo: req.file?.filename})
    res.json({
        massage : "success",
        data : {brand}
    })
};

 const deletebrand = async(req :Request , res:Response ) => {
    const brand = await brandsModel.findByIdAndDelete(req.params.id)
    res.json({
        massage : "success",
        data : {brand}
    })
};

 const updatebrand = async(req :Request , res:Response ) => {
    const brand = await brandsModel.findByIdAndUpdate(req.params.id , req.body , {'returnDocument':'after'})
    res.json({
        massage : "success",
        data : {Brand: brand}
    })
};
export default {getbrand , createbrand , deletebrand , updatebrand}