import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        {_id: {$ne: currentUserId}}, // exclude the current user.
        {_id:{$nin:currentUser.friends}}, // exclude the current user friends.
        {onboarded:true}
      ]
    })
    res.status(200).json(recommendedUsers)
  } catch (error) {
    console.error("Error in getRecommendedUsers controller",error.message);
    res.status(500).json({message:'Internal server error'});
  }
}

export async function getMyFriends(req, res) {
    try {
        const user = await User.findById(req.user.id)
        .select("friends")
        .populate("friends","fullName profilePic nativeLanguage learningLanguage");
        res.status(200).json(user.friends);
    } catch (error) {
        console.error("error in getMy Friends controller", error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function sendFriendRequest(req,res){
    try {
        const myId = req.user.id;
        const {id:recipientId} = req.params

        // prevent sending req to yourself
        if(myId===recipientId){
            return res.status(400).json({
                message:"you can not send friend request to yourself"
            });
        }

        const recipient = await User.findById(recipientId);
        if(!recipient){
            return res.status(404).json({
                message:"Recipient not found"
            });
        }

        // check if the user is already present.
        if(recipient.friends.includes(myId)){
            return res.status(400).json({
                message:"you are already the friend with the user"
            });

        }

        // check if the req already exist.
        const existingRequest = await FriendRequest.findOne({
            $or:[
                {sender:myId, recipient:recipientId},
                {sender: recipientId, recipient: myId}
            ],
        });

        if(existingRequest){
            return res
            .status(400)
            .json({message:"A friend request already exists between you and this user"});
        }

        const friendRequest = await FriendRequest.create({
            sender:myId,
            recipient:recipientId
        });

        res.status(201).json(friendRequest);
    } catch (error) {
        console.error("Error in sendFriendRequest controller", error.message);
        res.status(500).json({message:"Internal server error"}); 
    }
}

export async function acceptFriendRequest(req,res){
    try {
        const {id:requestId} = req.params;
        const friendRequest = await FriendRequest.findById(requestId);
        if(!friendRequest){
            return res.status(404).json({message:"friend request not found"});
        }

        if(friendRequest.recipient.toString() !== req.user.id){
            return res.status(403).json({message:"you are not authorized to accept this request"});
        }
        friendRequest.status = "Accepted";
        await friendRequest.save();

        // add each user to the others's friend array
        // $addToSet adds elements to an array only if they do not already exist.

        await User.findByIdAndUpdate(friendRequest.sender,{
            $addToSet:{friends: friendRequest.recipient},
        });

        await User.findByIdAndUpdate(friendRequest.recipient,{
            $addToSet:{friends: friendRequest.sender},
        })
    } catch (error) {
        
    }
}
