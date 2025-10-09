import {StreamChat} from "stream-chat";
import "dotenv/config"

const apiKey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_API_SECRET

if(!apiKey || !apiSecret){
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

