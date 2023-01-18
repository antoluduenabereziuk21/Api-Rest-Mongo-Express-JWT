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

export const getLink = async(req, res) => {
    try {
        //with this get onelink of one user , filter for you id, req.params
        const {id} = req.params;

        const link = await Link.findById(id);
        // if not exist link
        if(!link) return res.status(404).json({error:"no existe link"});
        //if the link does not belong to this user answer error
        if(!link.uid.equals(req.uid)) 
            res.status(401).json({error:"no le pertenece ese link"});
        res.json({link});

    } catch (error) {
        console.log(error);
        if(error.kind === "ObjectId"){
            return res.status(403).json({error:"Formato id incorrecto"});
        }
        return res.status(500).json({error:"error de servidor"});
    }
};

export const createLink = async(req, res) =>{ 
    try {
        //firts read all object sended for the body
        //secound create a mew instace of the link, note.used nanoid
        //thirth save in DB the document
        let {longLink}= req.body;
        if (!longLink.startsWith("http://")) {
            longLink = "https://" + longLink;
        }

        const link = new Link({longLink,nanoLink: nanoid(6), uid:req.uid});
        
        const newLink = await link.save();

        res.status(201).json({newLink});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"error de servidor"});
    }
};

export const removeLink = async(req, res) => {
    try {
        //with this get onelink of one user , filter for you id, req.params
        const {id} = req.params;

        const link = await Link.findById(id);
        // if not exist link
        if(!link) return res.status(404).json({error:"no existe link"});
        //if the link does not belong to this user answer error
        if(!link.uid.equals(req.uid)) 
            res.status(401).json({error:"no le pertenece ese link"});
        await link.remove();
        console.log("link removed successfully")
        res.json({link});

    } catch (error) {
        console.log(error);
        if(error.kind === "ObjectId"){
            return res.status(403).json({error:"Formato id incorrecto"});
        }
        return res.status(500).json({error:"error de servidor"});
    }
};

export const updateLink = async (req, res) => {
    try {
        //with this get onelink of one user , filter for you id, req.params,and req.body, for change the link
        const {id} = req.params;
        const {longLink} = req.body;
    
        console.log(longLink)

        const link = await Link.findById(id);
        // if not exist link
        if(!link) return res.status(404).json({error:"no existe link"});
        //if the link does not belong to this user answer error
       if(!link.uid.equals(req.uid)) 
          res.status(401).json({error:"no le pertenece ese link"});

        // update   
        link.longLink = longLink;
        await link.save();
        console.log("link update successfully")
        res.json({link});

    } catch (error) {
        console.log(error);
        if(error.kind === "ObjectId"){
            return res.status(403).json({error:"Formato id incorrecto"});
        }
        return res.status(500).json({error:"error de servidor"});
    }
}