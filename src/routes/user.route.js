import express from "express";
import { registerUser, loginUser, getOwnProfile, viewUsers } from "../controllers/user.controller.js";
import {registerValidtaion, queryValidation} from "../middlewares/validator.js"
import { verifyJWT } from "../middlewares/auth.js";


const router = express.Router();

router.post("/auth/register",registerValidtaion, registerUser);
router.post("/auth/login",registerValidtaion,  loginUser);
router.get("/users/me",verifyJWT, getOwnProfile);
router.get("/users",verifyJWT, queryValidation, viewUsers);// only for admin

export default router;

