import { tokenVerificationErrors } from "../utils/managerToken.js";
import jwt from "jsonwebtoken";

export const requiereRefreshToken = (req, res,next ) =>{
    try {
        const refreshTokenCookie =req.cookies.refreshToken;
        if(!refreshTokenCookie) throw new Error("No existe el Token");
    
        const {uid} =jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);

        req.uid = uid;
        next();
    } catch (error) {
        console.log(error);
        return res
        .status(401).json({error:tokenVerificationErrors})
    }
}