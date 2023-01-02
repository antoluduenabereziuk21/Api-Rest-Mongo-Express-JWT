import {body,validationResult} from "express-validator";

const validationError = (req,res,next) => {
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
        validationError
];

export const bodyLinkValidator = [
    body("longlink","formato de link incorrecto")
    .trim()
    .notEmpty()
    //.exists()
    ,validationError
];


    

