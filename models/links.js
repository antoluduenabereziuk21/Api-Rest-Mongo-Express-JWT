import mongoose from "mongoose";

const {Schema, model} = mongoose;

const linkSchema = new Schema({
    longLink:{
        type: String,
        required: true,
        trim:true,
    },
    //this is who  create at small link
    nanoLink:{
        type:String,
        required: true,
        trim:true,
        unique:true
    }, 
    //here referenced at id of user who created the link
    uid:{
        type:Schema.Types.ObjectId,
        ref:"User",//Important , dont unremember reference at the model , in this case is USER
        required: true,
    }
});

export const Link = model('Link',linkSchema);