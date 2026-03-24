import express from "express"; // it is our web framework and it allows us to make apis easily and quickly. 
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js" // .js is mendatory because we have the defined the type in the package.json is module.
import userRoutes from "./routes/user.route.js"
import chatRoutes from "./routes/chat.route.js"
import { connectDB } from "./lib/db.js";

dotenv.config(); // we have to eable this method to read the properties.

const app = express()
const PORT = process.env.PORT;

app.use(cors({
  origin:"http://localhost:5173",
  credentials: true // allow frontened to send the cookies.
}));
app.use(express.json()); // if we do not write this then values in the route may be defined undefined.
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/chat",chatRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(PORT,()=>{ // server listening port
    console.log(`server is running on port: ${PORT}`);
    connectDB();
})  
