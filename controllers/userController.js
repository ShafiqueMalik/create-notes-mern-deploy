import HomeModel from "../models/userModel.js";
import asyncHanlder from "express-async-handler";
import UserModel from "../models/userModel.js";
import { generateJwtToken } from "../utils/generateJwtToken.js";
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
    cloud_name: 'dovhizk82', 
    api_key: '862673387448211', 
    api_secret: '7HZsyN_9lnWz2ctjtPbnGGNKQi0',
    secure: true
  });

export const registerUser = asyncHanlder(async (req, res) => {
    try {
        const { name, email, password, pic } = req.body;
        
        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error("User Already Exists");
        }
        const user = await UserModel.create({
            name, email, password, pic
        });
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                pic: user.pic,
                token:generateJwtToken(user._id),
                success:true

            });
        } else {
            res.status(400);
            throw new Error("Error occured while creating the user.");
        }
    } catch (error) {
        res.status(400);
        throw new Error(`Un Expected error occured while creating the user ${error.message}`);
    }
});

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
    
        if(user && (await user.matchPassword(password))){
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                pic:user.pic,
                token:generateJwtToken(user._id),
                success:true
            });
        }else{
            res.status(400).json({
                error:true,
                message:"Invalid credentials"
            });
        }
    } catch (error) {
        res.status(400);
        throw new Error(`Un Expected error occured while login the user ${error.message}`);
    }
}
export const updateUserProfile = async (req, res) => {
    try {
        const { name,email,pic, password } = req.body;
        const user = await UserModel.findById(req.user._id);

        if(user){
            console.log(name)
            user.name = name || user.name;
            user.email = email || user.email;
            user.pic = pic || user.pic;

            if(password){
                user.password = password
            }
            const updatedUser  = await user.save();
            res.json({
                _id:updatedUser._id,
                name:updatedUser.name,
                email:updatedUser.email,
                pic:updatedUser.pic,
                token:generateJwtToken(updatedUser._id),
                status:"success"
            })
        }else{
            res.status(400);
            throw new Error("User not found!");
        }

    } catch (error) {
        res.status(400);
        throw new Error(`Un Expected error occured while updating profile. Error:${error.message}`);
    }
}

