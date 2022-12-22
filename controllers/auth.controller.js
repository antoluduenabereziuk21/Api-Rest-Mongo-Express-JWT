import { User } from "../models/User.js";

const register = async (req, res) => {
   const {email, password} = req.body;
   try{
    const user = new User({email, password});
    await user.save();
    console.log("User saved successfully");
    res.json(user);
   }catch(error){
    console.log(error);
   }
};

const login = (req, res) => {
    console.log(req.body);
    res.json({ok: "login ok"});
 };


export {
    login, register
}