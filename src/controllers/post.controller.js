import { Post } from "../models/post.modles.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";

export const createPost = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const newPost = {
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags,
    author: req.user._id,
  };

  const post = await Post.create(newPost);
  const createdPost = await Post.findById(post._id).select("-author");

  if (!post) {
    return res
      .status(500)
      .json({ message: "Something went wrong while create the post" });
  }

  if (!createdPost) {
    return res.staus(500).json({ message: "Unable to return posts" });
  }

  return res
    .status(201)
    .json({ message: "Post created successfully!", createdPost });
});
export const getAllPost = asyncHandler(async (req, res) => {});

export const updatePost = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { id = "" } = req.query;

  const post = {
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags,
    author: req.user._id,
  };

  if (!id) {
    return res.status(400).json({ message: "Post Id is required!!!" });
  }

  if (!post.title && !post.content && !post.tags) {
    return res
      .status(400)
      .json({ message: "Needed some content to update!!!" });
  }

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { $set: post },
    { new: true }
  );

  if (!updatedPost) {
    return res
      .status(500)
      .json({ message: "Something went wrong while updating the post" });
  }

  return res.status(200).json({ message: "Post Updated successfully", post });
});
export const deletePost = asyncHandler(async (req, res) => {});
// export const getMyPost = asyncHandler(async (req, res) => {});
