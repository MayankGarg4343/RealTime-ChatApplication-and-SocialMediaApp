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
            return res.status(400).json({})
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