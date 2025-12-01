import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.modles.js";

export const verifyJWT = asyncHandler(async(req, res, next) => {
  try {
    const token =
      req.cookies?.refreshToken.replace("Bearer ", "") ||
      req.header("Authorization").replace("Bearer ", "");

      console.log("The token is this : "+ token);
       if(!token){
        return res.status(401, "Unauthorized Access");
       }

       const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
       console.log("The decoded Token is this :", decodedToken)

       const user =  await User.findById(decodedToken._id).select("-password -refreshToken");
       if(!user){
        console.log("Error occured cause of the user from DB", user);
       }

       console.log("This is the user ", user);

       req.user = user;
       next();

  } catch (error) {
    console.log("This is the error ", error);
    return res.status(401).json({message: "Invalid refresh token!"}, error);
  }
});
