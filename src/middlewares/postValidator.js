import { body } from "express-validator";

const postValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title cannot be empty!")
    .trim()
    .escape()
    .isLength({ max: 120 })
    .withMessage("Maximum character length exceeds"),
  body("content")
    .notEmpty()
    .withMessage("Title cannot be empty!")
    .trim()
    .escape()
    .isLength({ max: 1200 })
    .withMessage("Maximum character length exceeds"),
  //   body("tags").custom((values) => {
  //     values.map((value) => {
  //       value
  //         .notEmpty()
  //         .withMessage("Tags cannot be empty")
  //         .escape()
  //         .isLength({ max: 50 })
  //         .withMessage("Tags exceeds maximum characters");
  //     });
  //   }),

  body("tags").isArray().withMessage("Tags must be an array"),
  body("tags.*")
    .notEmpty()
    .withMessage("Tags cannot be empty")
    .isLength({ max: 50 })
    .withMessage("Each tag must be at most 50 characters")
    .trim()
    .escape(),
];

export default postValidator;
