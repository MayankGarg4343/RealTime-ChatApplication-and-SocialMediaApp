import express from "express"; // it is our web framework and it allows us to make apis easily and quickly. 
const app = express()

app.get("/",(req,res)=>{
    res.send("hello world");
})

app.listen(5001,()=>{
    console.log("server is running on port 5001");
})