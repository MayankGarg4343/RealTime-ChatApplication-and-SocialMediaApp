import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMyFriends, getRecommendedUsers } from '../Controllers/user.controller.js';

const router = express.Router();

router.use(protectRoute); // applied auth middleware to all  route.

router.get("/",getRecommendedUsers);

router.get("/friends",getMyFriends);

export default router; 