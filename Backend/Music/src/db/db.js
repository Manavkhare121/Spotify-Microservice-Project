import mongoose from "mongoose";
import config from "../config/config.js"
async function connectDB(params) {
    try{
        await mongoose.connect(config.MONGO_URI);
        console.log('connected to MONGODB');
    }catch(err){
        console.log('Failed to connect to MongoDB',err)
    }
}

export default connectDB;