import { nanoid } from "nanoid";
import { Link } from "../models/Link.js";

export const getLinks = async(req, res) =>{
    try {
        //with this get all links of one user , filter for you id, in this case uid:userId
        const links = await Link.find({uid :req.uid})

        return res.json({links});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"error de servidor"});
    }
    
};

export const createLink = async(req, res) =>{ 
    try {
        //firts read all object sended for the body
        //secound create a mew instace of the link, note.used nanoid
        //thirth save in DB the document
        const {longLink}= req.body;

        const link = new Link({longLink,nanoLink: nanoid(6), uid:req.uid});
        
        const newLink = await link.save();

        return res.json({newLink});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"error de servidor"});
    }
}