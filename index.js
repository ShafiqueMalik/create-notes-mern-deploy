import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import {fileURLToPath} from 'url';

import fileUpload from "express-fileupload";
dotenv.config();

import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(fileUpload({
    useTempFiles : true
}));

app.use(cors());

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));

app.use("/api/users",userRoutes);
app.use("/api/notes",noteRoutes);

// ------------ Deployment ---------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/front-end/build")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"front-end/build/index.html"));
    });
}else{
    app.get("/",(req,res)=>{
       res.send("API IS RUNING...")
    })
}



// ------------ Deployment ---------------

app.use(notFound);
app.use(errorHandler);

const CONNECTION_URL = process.env.MONGODB_URL

const PORT = process.env.PORT || 9001;
// app.listen(PORT,()=>console.log(`Server running on port: ${PORT}`))
mongoose.set("strictQuery", false);

//stop warnings from console
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>console.log(`Server running on port: ${PORT} and mongodb connected`)))
.catch((error)=>console.log("=====Error=====",error.message));





