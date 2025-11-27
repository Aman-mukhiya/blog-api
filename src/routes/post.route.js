import express from "express";

const router = express.Router();

router.get("/posts", getPost);
router.post("/posts", createPost);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);
router.get("/posts/me", getMyPost);


export default router;