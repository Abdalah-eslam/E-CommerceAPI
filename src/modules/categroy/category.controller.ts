import { after } from "node:test";
import { categoryModel } from "../../models/category.model";
import type{ Request , Response } from "express";

export const getCategories = async(req :Request , res:Response ) => {
    const categories = await categoryModel.find()
    res.json({
        massage : "success",
        data : {categories}
    })
};
export const createCategory = async(req :Request , res:Response ) => {
    console.log(req.body);
    
    const category = await categoryModel.create(req.body)
    res.json({
        massage : "success",
        data : {category}
    })
};

export const deleteCategory = async(req :Request , res:Response ) => {
    const category = await categoryModel.findByIdAndDelete(req.params.id)
    res.json({
        massage : "success",
        data : {category}
    })
};

export const updateCategory = async(req :Request , res:Response ) => {
    const category = await categoryModel.findByIdAndUpdate(req.params.id , req.body,{'returnDocument':'after'})
    res.json({
        massage : "success",
        data : {category}
    })
};