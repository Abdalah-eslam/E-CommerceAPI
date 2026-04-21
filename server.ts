import express  from 'express';
import {PORT} from './src/config/ENVconfig.js';
import { DBConnection } from './src/config/DBconfig.js';
import cookieParser from'cookie-parser'
import {init} from './src/index.js'
const app = express();
app.use(express.static('src/uploads'))
app.use(express.json())

app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
init(app);
//conect to DB
DBConnection;
app.listen(PORT , ()=>console.log(`server running at port ${PORT}`));