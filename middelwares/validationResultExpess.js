import axios from "axios";
import {body,validationResult} from "express-validator";

const validationExpress = (req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
}

export const validation=[
        body("email","Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
        body("password","Formato de password incorrecto")
        .trim()
        .isLength({min:6}),
        validationExpress
];

export const bodyLinkValidator = [
    body("longLink", "Formato link incorrecto")
        .trim()
        .custom(async (value) => {
            try {
                if (!value.startsWith("http://")) {
                    value = "https://" + value;
                }
                await axios.get(value);
                console.log(value);
                return value;

            } catch (error) {
                throw new Error("Link 404 not found");
            }
        })
    ,validationExpress,
];


    

