import { body } from "express-validator";

const registerValidtaion = [
  body("name")
    .notEmpty()
    .withMessage("Name is empty!")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 to 50 characters"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email")
    .escape()
    .normalizeEmail(),

  body("password")
    .matches("[0-9]")
    .withMessage("Password Must Contain a Number")
    .matches("[A-Z]")
    .withMessage("Password Must Contain an Uppercase Letter")
    .escape()
    .isLength({ min: 5 })
    .withMessage("password must be atleast 5 character long"),

  body("role")
    .notEmpty()
    .withMessage("role cannot be empty")
    .isIn(["user", "admin"])
    .withMessage("Invalid role!"),
];

export default registerValidtaion;
