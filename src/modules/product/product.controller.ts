import { log } from "console";
import { productModel } from "../../models/product.model";
import type{ Request , Response } from "express";
import aqp from 'api-query-params';
import { json } from "stream/consumers";
export const getProducts = async(req :Request , res:Response ) => {
let { filter, limit,sort } = aqp(req.query as any);
    const query = JSON.parse(JSON.stringify(filter))
    // pagination
    let page = req.query.page ? Number(req.query.page) : 1
    if (page <= 0) page=1
    limit = Math.min(Number(limit) || 10, 50);
    const skip = (page - 1) * limit
    const [products, total] = await Promise.all([
        await productModel.find(query).skip(skip).limit(limit).sort(sort as any),
    productModel.countDocuments()
    ]);
    const TotalPages = Math.ceil(total/ limit)
    
        res.json({
        massage : "success",
        Metadate : {
            CurrantPage : page,
            TotalPages ,
            ...(page > 1 && { prevPage: page - 1 }),
            ...(page < TotalPages && { nextPage: page + 1 })
        },
        data : {products}
    })

};

const CreateProduct = async(req :Request , res:Response ) => {
    console.log(req.body);
    
    const product = await productModel.create(req.body)
    res.json({
        massage : "success",
        data : {product}
    })
};
const updateProduct = async(req :Request , res:Response ) => {
    const product = await productModel.findByIdAndUpdate(req.params.id , req.body,{'returnDocument':'after'})
    res.json({
        massage : "success",
        data : {product}
    })
};
const deleteProduct = async(req :Request , res:Response ) => {
    const product = await productModel.findByIdAndDelete(req.params.id)
    res.json({
        massage : "success",
        data : {product}
    })
};
export default {
    getProducts
    ,CreateProduct
    ,updateProduct
    ,deleteProduct
}