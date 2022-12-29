import jwt from "jsonwebtoken";

export const requiereToken = (req, res, next) => {
    try {
        let token = req.cookies.token;
        
        if (!token)
             throw new Error("No Bearer");
        
        //token = token.split(" ")[1];
        //hot to work with the token , is anchivements of destructure and use only the uid
        const {uid} =jwt.verify(token,process.env.JWT_SECRET);
        //and then we are asigment an req the uid , for use in the controller
        req.uid = uid;
        //console.log(uid);
        next()
    } catch (error) {
        console.log(error);
        //return the message with the error message
        //here is generate the errors of the token message
        const TokenVerificationErrors = {
            ["invalid signature"]: "La firma de JWT no es valida",
            "jwt expired":"JWT expirado",
            "invalid token":"Token no valido",
            "invalid Bearer":"Utiliza formato Bearer",
            "jwt malformed":"token mal formado",
        };
        return res
        .status(401)
        .send({error: TokenVerificationErrors[error.message]});
    }
};
//here validating the token for complete the get 

/*esta logica sireve si uitlizamos los tokens pero mas abajo la realizamos con cookies */
/*export const requiereToken = (req, res, next) => {
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
        //here is generate the errors of the token message
        const TokenVerificationErrors = {
            ["invalid signature"]: "La firma de JWT no es valida",
            "jwt expired":"JWT expirado",
            "invalid token":"Token no valido",
            "invalid Bearer":"Utiliza formato Bearer",
            "jwt malformed":"token mal formado",
        };
        return res
        .status(401)
        .send({error: TokenVerificationErrors[error.message]});
    }
};*/

export const requiereTokenRespaldo = (req, res, next) => {
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
        //here is generate the errors of the token message
        const TokenVerificationErrors = {
            ["invalid signature"]: "La firma de JWT no es valida",
            "jwt expired":"JWT expirado",
            "invalid token":"Token no valido",
            "invalid Bearer":"Utiliza formato Bearer",
            "jwt malformed":"token mal formado",
        };
        return res
        .status(401)
        .send({error: TokenVerificationErrors[error.message]});
    }
};