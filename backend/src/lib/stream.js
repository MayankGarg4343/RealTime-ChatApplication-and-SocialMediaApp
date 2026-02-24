import {StreamChat} from "stream-chat";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_SECRET_KEY

if(!apiKey || !apiSecret){ // checking that whether the keys are present or not.
    console.log("Stream API key or secret is missing");
}
const streamClient = StreamChat.getInstance(apiKey, apiSecret); // by this we can communicate with the Stream platform. 

export const upsertStreamUser = async (userData)=>{
    try{
        await streamClient.upsertUsers([userData]); // upsert here used to create the user and if it already exists update the info.
        return userData
    } catch(error){
        console.error("Error upserting stream user:", error); 
    }
};

export const generateStreamToken = (userId) =>{

};