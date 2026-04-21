import { after } from "node:test";
import { categoryModel } from "../../models/category.model";
import type{ Request , Response } from "express";
import { AsyncErrorHandle } from "../../middlewares/AsyncErrorHandle";

export const getCategories =AsyncErrorHandle( async(req :Request , res:Response ) => {
    const categories = await categoryModel.find()
    res.json({
        massage : "success",
        data : {categories}
    })
});
export const createCategory =AsyncErrorHandle( async(req :Request , res:Response ) => {
    req.body.img = req.file?.filename
    const category = await categoryModel.create(req.body)
    res.json({
        massage : "success",
        data : {category}
    })
});

export const deleteCategory =AsyncErrorHandle( async(req :Request , res:Response ) => {
    const category = await categoryModel.findByIdAndDelete(req.params.id)
    res.json({
        massage : "success",
        data : {category}
    })
});

export const updateCategory =AsyncErrorHandle( async(req :Request , res:Response ) => {
   if (req.file) req.body.img = req.file?.filename
    const category = await categoryModel.findByIdAndUpdate(req.params.id , req.body,{'returnDocument':'after'})
    res.json({
        massage : "success",
        data : {category}
    })
});