import express from "express";
import { signup, login, logout } from "../Controllers/auth.controller.js";
const router = express.Router()

// creted the routes of the signup, login and logout.
router.post("/signup", signup);
router.post("/login", login); 
router.post("/logout",logout);

// creating the route for onboarding.

export default router;
