import mongoose, { Schema } from "mongoose";
const playschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    artist:{
        type:String,
        required:true
    },
    artistId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    musics:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'music'
    }]
})
const playlist=mongoose.model('playlist',playschema);
export default playlist;