import jwt from "jsonwebtoken";
import UserModel from '../models/userModel.js';

export const checkUserAuth = async(req,res,next)=>{
    let token;
    const {authorization} = req.headers;
    if(authorization && authorization.startsWith("Bearer")){
        try {
            token = authorization.split(" ")[1];

            const {id} = jwt.verify(token,process.env.JWT_SECRET_KEY);
            req.user = await UserModel.findById(id).select("-password");
            // res.status(409).json({ status: "error", message: "All fields are required." })
            next();

        } catch (error) {
            res.status(409).json({ status: "error", message: "Unauthorized user" })
        }
    }else{
        res.status(409).json({ status: "error", message: "Unauthorized user" })
    }
}