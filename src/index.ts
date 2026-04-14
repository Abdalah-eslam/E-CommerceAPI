import express  from 'express';
import {PORT} from './config/ENVconfig.js';
import { DBConnection } from './config/DBconfig.js';
import CategoryRouter from './modules/categroy/category.route.js';
import multer from 'multer';
import BerandRouter from './modules/brand/brand.route.js';
import SubcategoryRouter from './modules/subcategory/subcategory.route.js';
import ProductRouter from './modules/product/product.route.js';

const app = express();
const upload = multer();
app.use(upload.none());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//conect to DB
DBConnection;
app.use('/api/v1/Category' ,CategoryRouter)
app.use('/api/v1/Brand' ,BerandRouter)
app.use('/api/v1/SubCategory' ,SubcategoryRouter)
app.use('/api/v1/Product' ,ProductRouter)
app.get('/',(req:express.Request ,res:express.Response )=>{res.json(`hello world`);})

app.listen(PORT , ()=>console.log(`server running at port ${PORT}`));