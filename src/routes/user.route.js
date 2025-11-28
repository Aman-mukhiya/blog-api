import express from "express";
import { registerUser } from "../controllers/user.controller.js";
import validtaion from "../middlewares/validator.js"

const router = express.Router();

router.post("/auth/register",validtaion, registerUser);
router.post("/auth/login",validtaion,  loginUser);
// router.get("/users", viewUsers);// only for admin

export default router;

