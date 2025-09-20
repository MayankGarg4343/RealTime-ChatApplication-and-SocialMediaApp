import User from "../models/User.js";

export async function signup(req,res){
    const {email,password,fullName} = req.body;

    try{
        if(!email || !password || !fullName){
            return res.status(400).json({message: "All fields are required"});
        }
        if(password.length < 6){
            return res.status(400).json({message: "password must be atleast 6 characters"});
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailPattern.test(email)){
            return res.status(400).json({ message: "Invalid Email format"});
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "email already exist, please use a different email"})
        }
         
    } catch(error){

    }
}
export async function login(req,res){
    res.send("login route");
}
export function logout(req,res){
    res.send("logout route");
}