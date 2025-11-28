import asyncHandler from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";

export const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  // res.status(200).send({ message: "all working!!!" });

  
});
