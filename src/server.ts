import express  from 'express';
import {PORT} from './config/ENVconfig.js';
import { DBConnection } from './config/DBconfig.js';
import cookieParser from'cookie-parser'
import cors from 'cors'
import {init} from './index.routes.js'
const app = express();
app.use(cors());
app.use(express.static('src/uploads'))
app.use(express.json())

app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
init(app);
//conect to DB
DBConnection;
app.listen(PORT , ()=>console.log(`server running at port ${PORT}`));