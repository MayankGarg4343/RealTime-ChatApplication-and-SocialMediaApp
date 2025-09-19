import express from "express"; // it is our web framework and it allows us to make apis easily and quickly. 
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js" // .js is mendatory because we have the defined the type in the package.json is module.
import { connectDB } from "./lib/db.js";

dotenv.config(); // we have to eable this method to read the properties.

const app = express()
const PORT = process.env.PORT;


app.use("/api/auth",authRoutes);

app.listen(PORT,()=>{
    console.log(`server is running on port: ${PORT}`);
    connectDB();
})  