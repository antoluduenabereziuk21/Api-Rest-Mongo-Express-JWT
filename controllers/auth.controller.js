import { User } from "../models/User.js";

const register = async (req, res) => {
   const {email, password} = req.body;
 
   try{
    //remember for use of method of model of mongoose,
    //use USer what ti is a instance of the model
    const user = new User({email, password});
    await user.save();

    //jwt token 
    
    console.log("User saved successfully");
    return res.json(user);

   }catch(error){

    console.log(error.code);
    //here capture a error, and if user is duplicate ,
    //response with de msg "the user already exists"
    if(error.code === 11000){
        return res.status(400).json({error: "Ya existe el usuario"});
    }

   }
};

const login = (req, res) => {
    console.log(req.body);
    res.json({ok: "login ok"});
 };


export {
    login, register
}