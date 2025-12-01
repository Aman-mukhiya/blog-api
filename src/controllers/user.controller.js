import asyncHandler from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";
import { User } from "../models/user.modles.js";

const getRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const refreshToken = "Bearer " + user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return refreshToken;
  } catch (error) {
    throw error;
  }
};

export const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  // res.status(200).send({ message: "all working!!!" });

  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };

  const userExists = await User.findOne({
    $or: [{ name: newUser.name }, { email: newUser.email }],
  });

  if (userExists) {
    return res
      .status(409)
      .json({ message: "User with same name or email already exists!" });
  }

  const submittedUser = await User.create(newUser);

  if (!submittedUser) {
    return res.status(500).json({ message: "Unable to store user" });
  }

  const createdUser = await User.findById(submittedUser._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .json({ createdUser, message: "User created Successfully!!!" });
});

export const loginUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  // res.status(200).send({ message: "all working!!!" });

  const userData = {
    name: req.body.name.toString(),
    email: req.body.email.toString(),
    password: req.body.password,
    role: req.body.role.toString(),
  };

  const userExists = await User.findOne({
    $and: [
      { name: userData.name },
      { email: userData.email },
      { role: userData.role },
    ],
  });

  if (!userExists) {
    return res.status(400).json({ message: "User does not exists!!!" });
  }

  const isPasswordCorrect = await userExists.isPasswordCorrect(
    userData.password
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect password!" });
  }

  const refreshToken = await getRefreshToken(userExists._id);
  // guess this will never work
  // if(!refreshToken){
  //   return res.status(500).json({message: "Unable to create refreshToken!!!"});
  // }

  //to get access of fully Update user
  const loggedInUser = await User.findById(userExists._id).select(
    "-password -refreshToken"
  );

  const options = { httpOnly: true, secure: true };

  if (userData.role == "admin") {
    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .json({ message: "Admin logged in successfully", Admin: loggedInUser });
  }

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .json({ message: "User logged in successfully", user: loggedInUser });
});

export const getOwnProfile = asyncHandler(async (req, res) => {
  const id = req.user._id;

  const user = await User.findById(id).select("-password -refreshToken");

  if (!user) {
    return res
      .status(500)
      .json({ message: "Something went wrong while fetching the user!!!" });
  }

  return res
    .status(200)
    .json({ message: "User retrived successfully!!!", user: user });
});

export const viewUsers = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const { page = 1, limit = 10 } = req.query;

  const admin = await User.findById(id).select("-password -refreshToken");

  if (admin.role != "admin") {
    return res.status(402).json({ message: "Unauthorized admin access" });
  }

  const users = await User.find()
    .skip(limit * (page - 1))
    .limit(limit)
    .sort({ createdAt: -1 });

  if (!users) {
    return res
      .status(500)
      .json({ message: "Something went wrong while retriving the users!!!" });
  }

  return res
    .status(200)
    .json({ message: "Users retrived successfully", Page: page, Users: users });
});
