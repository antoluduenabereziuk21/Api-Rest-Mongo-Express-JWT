import jwt from "jsonwebtoken";
//here validating the token for complete the get 
export const requiereToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;
        //if is not use the token in the header with Bearer ,the program faile
        if (!token)
             throw new Error("No exist the token en el header usa Bearer");
        //how use Bearer in Headers , is necesary delete of space in white 
        //with split separamos el token de este espacio en blanco lo cual nos permitira usar el token
        token = token.split(" ")[1];
        //hot to work with the token , is anchivements of destructure and use only the uid
        const {uid} =jwt.verify(token,process.env.JWT_SECRET);
        //and then we are asigment an req the uid , for use in the controller
        req.uid = uid;
        console.log(uid);
        next()
    } catch (error) {
        console.log(error);
        //return the message with the error message
        return res.status(401).json({ error: error.message });
    }
};