import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: { 
        type: String,
        required: true,
        trim: true, 
        unique: true,
        lowerCase: true, 
        index:{unique: true},
    },
    password: {
        type: String,
        required: true
    }
});
// with pre generet hash of password
userSchema.pre("save",async function (next){
    const user = this;
//here is futures when user change a password
    if(!user.isModified("password")) return next();

    try {
        //salt generet a salt in hash of password
        const salt = await bcrypt.genSalt(10);
        // hashing password 
        user.password = await bcrypt.hash(user.password, salt);
        next();
    }catch(error){
        console.log(error);
        throw new Error("Fallo has de password");
    }
    
});
//mehtods is provide for mongoose, and comparePassword is something what already exists
// with candidate password what send the controller , 
//we are check the password and return fo password

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password);
}
 
export const User = mongoose.model('User',userSchema);