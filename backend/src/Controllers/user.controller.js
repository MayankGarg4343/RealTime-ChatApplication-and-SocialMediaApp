import User from "../models/User.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        {
          _id: {
            $ne: currentUserId, // exclude the current user
          },
          $id:{
            $nin:currentUser.friends // exclude the current user friends
          }
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getMyFriends(req, res) {}
