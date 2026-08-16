import mongoose, { connect } from "mongoose";
import _config from "../config/config.js";
import {config } from "dotenv";
async function connectDB(params) {
    try{
        await mongoose.connect(_config.MONGO_URI)
        console.log("connected to the database");
    }catch(err){
        console.log("error connecting to the database",err);
    }
}
export default connectDB;