import express from "express";
import { registerUser,loginUser,updateUserProfile } from "../controllers/userController.js";
import { checkUserAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/profile",checkUserAuth,updateUserProfile);

export default router;
