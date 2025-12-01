import express from "express";
import postValidator from "../middlewares/postValidator";

const router = express.Router();

router.get("/posts", getPost);
router.post("/posts",postValidator, createPost);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);



export default router;