import asyncHandler from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";
import { User } from "../models/user.modles.js";

const getRefreshToken = async (userId) => {
  try {
    const user = User.findById(userId);
    const refreshToken = "Bearer" + user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return refreshToken;
  } catch (error) {
    return res
      .status(500)
      .json(
        { message: "Something went wrong while generating refreshToekn" },
        error
      );
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

  const userExists = await User.findOne({ $or: [newUser.name, newUser.email] });

  if (userExists) {
    res
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
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };

  const userExists = await User.findOne({
    $and: [userData.name, userData.email, userData.role],
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

  //to get access of fully Update user
  const loggedInUser = await User.findById(userExists._id).select(
    "-password -refreshToken"
  );

  const options = { httpOnly: true, secure: true };

  res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .json({ message: "User logged in successfully" }, loggedInUser);
});
