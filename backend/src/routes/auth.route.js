import express from "express";
import { signup, login, logout, onboard } from "../Controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router()

// creted the routes of the signup, login and logout.
router.post("/signup", signup);
router.post("/login", login); 
router.post("/logout",logout);

// creating the route for onboarding.
router.post("/onboarding",protectRoute,onboard);

export default router;
