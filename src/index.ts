import BerandRouter from './modules/brand/brand.route.js';
import SubcategoryRouter from './modules/subcategory/subcategory.route.js';
import ProductRouter from './modules/product/product.route.js';
import { globalErrorHandler } from './middlewares/globalErorrHandle.js';
import CategoryRouter from './modules/categroy/category.route.js';
import type { Request , Response } from "express";
import UserRouter from './modules/user/user.route.js';
import AuthRouter from './modules/auth/auth.route.js';
export const init = function(app :any){
app.use('/api/v1/Category' ,CategoryRouter)
app.use('/api/v1/Brand' ,BerandRouter)
app.use('/api/v1/Product' ,ProductRouter)
app.use('/api/v1/Subcategory' ,SubcategoryRouter)
app.use("/api/v1/User" ,UserRouter)
app.use("/api/v1/Auth" , AuthRouter)
app.use(globalErrorHandler)
// app.use('*', (req:Request ,res:Response )=>{res.json({massage : "not found"});})
app.get('/',(req:Request ,res:Response )=>{res.json(`hello world`);})
}