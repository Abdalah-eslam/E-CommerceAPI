import {  subCategoryModel } from "../../models/subcategory.model.js";
import type{ Request , Response } from "express";
import Apifeature from "../../utils/ApiFeature.js";
export const getSubCategories = async(req :Request , res:Response ) => {
const { CategoryId } = req.params;
const filter = CategoryId ? { category: CategoryId } : {};
const feature = new Apifeature(
subCategoryModel.find(filter),
req.query)
.filter()
.sorting()
.limitFields()
.pagination();

await feature.count(subCategoryModel);

const subcategories = await feature.query.exec();

res.json({
message: "success",
metadata: {
    total: feature.total,
    page: feature.page
},
data: subcategories
});
};
export const createSubCategory = async(req :Request , res:Response ) => {
    const {CategoryId} = req.params
    const Subcategory = await subCategoryModel.create({
    ...req.body,
    category: CategoryId
});
    res.json({
        massage : "success",
        data : { Subcategory,
        }
    })
};

export const deleteSubCategory = async(req :Request , res:Response ) => {
    const {CategoryID} = req.params
    const Subcategory = await subCategoryModel.findByIdAndDelete(req.params.id)
    res.json({
        massage : "success",
        data : { Subcategory,
            Category : CategoryID
        }
    })
};

export const updateSubCategory = async(req :Request , res:Response ) => {
    const {CategoryID ,id} = req.params
    const Subcategory = await subCategoryModel.findByIdAndUpdate(id , req.body,{'returnDocument':'after'})
    res.json({
        massage : "success",
        data : {Subcategory,
            Category : CategoryID
        }
    })
};