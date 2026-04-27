import { productModel } from "../../models/product.model.js";
import type{ Request , Response } from "express";
import { AsyncErrorHandle } from "../../middlewares/AsyncErrorHandle.js";
import AppError from "../../utils/AppError.js";
import Apifeature from "../../utils/ApiFeature.js";
export const getProducts = async(req :Request , res:Response ) => {
    const SubcategoryID = req.params.SubcategoryId
    const filterSubcategory = SubcategoryID? { subCategory: SubcategoryID } : {};
    const feature = new Apifeature(productModel.find(filterSubcategory), req.query).filter().sorting().limitFields().pagination();
    await feature.count(productModel);
    const products = await feature.query;
    const TotalPages = Math.ceil(feature.total/Number(feature.limit));
        res.json({
        massage : "success",
            Metadate : {
                TotalProducts : feature.total,
                CurrantPage : +feature.page,
                ...(TotalPages>1 &&  {TotalPages } ),
                ...(+feature.page > 1 && { prevPage: +feature.page - 1 }),
                ...(+feature.page< TotalPages && { nextPage: +feature.page+ 1 })
            },
        data : {products}
    })
};

const CreateProduct =AsyncErrorHandle( async(req :Request , res:Response ) => {
    const {SubcategoryId}= req.params 
    const files = req.files as {
imgCover?: Express.Multer.File[];
images?: Express.Multer.File[];
};
    req.body.imgCover = files.imgCover?.[0]?.filename
    req.body.images = files.images?.map((file :any) => file.filename) as any

    const product = await productModel.create({...req.body, subCategory:SubcategoryId})
    res.json({
        massage : "success",
        data : {product}
    })
});
const updateProduct =AsyncErrorHandle( async(req :Request , res:Response ) => {
    if (req.files) {
        const files = req.files as {
imgCover?: Express.Multer.File[];
images?: Express.Multer.File[];
};
        req.body.imgCover = files.imgCover?.[0]?.filename
    req.body.images = files.images?.map((file :any) => file.filename) as any
    }   
    const product = await productModel.findByIdAndUpdate(req.params.id , req.body,{'returnDocument':'after'})
    res.json({
        massage : "success",
        data : {product}
    })
});
const deleteProduct =AsyncErrorHandle( async(req :Request , res:Response ) => {
    const product = await productModel.findByIdAndDelete(req.params.id)
    if (!product) throw new AppError('product not found',404)
    res.json({
        massage : "success",
        data : {product}
    })
});
export default {
getProducts
,CreateProduct
,updateProduct
,deleteProduct
}