import mongoose from "mongoose"; // imported the mongoose module.
import dotenv from "dotenv"; // imported the dotenv module.

dotenv.config(); // loads the environment variables.
export const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb connected: ${conn.connection.host}`);
    } catch(error){
        process.exit(1) // something went wrong 1 means failure.
    }
}
