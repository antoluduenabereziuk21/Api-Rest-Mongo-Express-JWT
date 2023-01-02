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

export const generateRefreshToken = (uid,res) => {
    const expiresIn = 60 * 60 * 24 * 30;

    try {
        const refreshToken = jwt.sign({uid},
            process.env.JWT_REFRESH,
            {expiresIn}
            );
            res.cookie("refreshToken", refreshToken,{
                httpOnly: true,
                secure:!(process.env.MODO === "developer"),
                /*aqui indicamos el tiempo de expiracion del refreshToken,
                este expires se enceuntra en milisegundos por lo cual lo
                devemos multiplicar por 1000*/
                expires: new Date(Date.now() + expiresIn *1000)
            });
            
    } catch (error) {
        console.log("ESTOY FALLANDO ACA")
    }
}

export const tokenVerificationErrors = {
    ["invalid signature"]: "La firma de JWT no es valida",
    "jwt expired":"Token expirado",
    "invalid token":"Token no valido",
    "invalid Bearer":"Utiliza formato Bearer",
    "jwt malformed":"Token mal formado",
};