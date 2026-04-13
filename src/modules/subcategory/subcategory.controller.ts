import { after } from "node:test";
import {  subCategoryModel } from "../../models/subcategory.model";
import type{ Request , Response } from "express";

export const getSubCategories = async(req :Request , res:Response ) => {
    const categories = await subCategoryModel.find()
    res.json({
        massage : "success",
        data : {categories}
    })
};
export const createSubCategory = async(req :Request , res:Response ) => {
    console.log(req.body);
    
    const category = await subCategoryModel.create(req.body)
    res.json({
        massage : "success",
        data : {category}
    })
};

export const deleteSubCategory = async(req :Request , res:Response ) => {
    const category = await subCategoryModel.findByIdAndDelete(req.params.id)
    res.json({
        massage : "success",
        data : {category}
    })
};

export const updateSubCategory = async(req :Request , res:Response ) => {
    const category = await subCategoryModel.findByIdAndUpdate(req.params.id , req.body,{'returnDocument':'after'})
    res.json({
        massage : "success",
        data : {category}
    })
};