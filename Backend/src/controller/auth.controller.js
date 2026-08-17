import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import config from "../config/config.js";
export async function register(req,res) {
    const {email,fullName:{firstName,lastName},password}=req.body;
    const isUserAlreadyExists=await userModel.findOne({email});
    if(isUserAlreadyExists){
        return res.status(400).json({message:"User Already exists"});
    }
    const hash=await bcrypt.hash(password,10);
    const user=await userModel.create({
        email,
        password:hash,
        fullName:{
            firstName,
            lastName
        }
    })

    const token=jwt.sign({
        id:user._id,
        role:user.role
    },config.JWT_SECRET,{expiresIn:"2d"});
    res.cookie("token",token);
    res.status(201).json({
        message:"User created successfully",
        user:{
            id:user._id,
            email:user.email,
            fullName:user.fullName,
            role:user.role
        }
    })
    
}