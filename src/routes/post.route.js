import express from "express";
import { createPostValidation, updatePostValidation, deletePostValidation } from "../middlewares/postValidator.js";
import { getAllPost, createPost, updatePost, deletePost } from "../controllers/post.controller.js"
import { verifyJWT } from "../middlewares/auth.js";

const router = express.Router();

router.get("/posts", getAllPost);
router.post("/posts", verifyJWT, createPostValidation, createPost);
router.put("/posts/:id", verifyJWT, updatePostValidation, updatePost);
router.delete("/posts/:id", verifyJWT, deletePostValidation, deletePost);

export default router;
