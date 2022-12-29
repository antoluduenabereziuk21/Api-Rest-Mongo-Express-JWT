import express from "express";
import 'dotenv/config';
import './database/connectdb.js'
import authRouter from './routes/auth.route.js';
import cookieParser from "cookie-parser";


const app = express();

app.use(express.json());
//habilitamos las cookies para usarlas en el envio del token
app.use(cookieParser());
app.use('/api/v1/auth',authRouter);
//this is only used for for exampel , for use in tests of persistence of tokens
app.use(express.static('public'))

const PORT = process.env.PORT  ||5000;
app.listen(PORT,()=> console.log(`app is running in http://localhost:${PORT}`));