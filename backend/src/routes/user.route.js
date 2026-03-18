import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMyFriends, getRecommendedUsers, sendFriendRequest } from '../Controllers/user.controller.js';

const router = express.Router();

router.use(protectRoute); // applied auth middleware to all  route.

router.get("/",getRecommendedUsers);

router.get("/friends",getMyFriends);

router.post("/friend-request/:id",sendFriendRequest);
router.post("/friend-request/:id/accept",acceptFriendRequest);

export default router; 