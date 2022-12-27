import  jwt  from "jsonwebtoken";


export const generateToken = (uid) => {
    //with expiresIn , indicate the time of life of token , in this case 15min
    const expiresIn=15*60;
    
    try {
       const token = jwt.sign({uid },process.env.JWT_SECRET,{expiresIn});
       return {token ,expiresIn};  
    } catch (error) {
        console.log(error);
    }
}