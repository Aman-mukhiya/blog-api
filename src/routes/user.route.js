import express from "express";

const router = express.Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/users", viewUsers);// only for admin

export default router;

