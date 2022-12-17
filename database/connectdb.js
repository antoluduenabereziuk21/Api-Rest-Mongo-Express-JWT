  import mongoose from 'mongoose';

try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connect DB mongo ok");
}catch(e) {
    console.log("connect DB error: " + e.message);
}