import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
   const {email, password} = req.body;
 
   try{
    //remember for use of method of model of mongoose,
    //use USer what ti is a instance of the model
    const user = new User({email, password});
    await user.save();

    //jwt token 
    
    console.log("User saved successfully");
    //using the code of status
    return res.status(201).json(user);

   }catch(error){

    console.log(error.code);
    //here capture a error, and if user is duplicate ,
    //response with de msg "the user already exists"
    if(error.code === 11000){
        return res.status(400).json({error: "Ya existe el usuario"});
    }
    //using code status for default error
    return res.status(500).json({error:"Errror de servidor"});

   }
};

const login = async(req, res) => {

    try {
        const {email, password} = req.body;
        //first check exist email
        let user = await User.findOne({email});
        if(!user) {
            console.log("User: No Existe usaurio");   
            return res.status(403).json({error:"No existe el usuario"});
        };
        //secound check password
        const resultPassword = await user.comparePassword(password);
        if (!resultPassword)
            return res.status(403).json({error:"Credenciales incorrectas"});
        //if it is ok generet token with JWT

        
        const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET);
        return res.json({token});

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Errror de servidor"});
    }
    
 };


export {
    login, register
}