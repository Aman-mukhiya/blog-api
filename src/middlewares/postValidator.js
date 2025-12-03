import { body, query } from "express-validator";

export const createPostValidation = [
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

// here query("id") seems to chatch a req which doesn't have particularly written ?id="dsfd" rather than ../dsfd
export const updatePostValidation = [
  query("id").notEmpty().escape(),
  body("title")
    .optional()
    .notEmpty()
    .withMessage("Title cannot be empty!")
    .trim()
    .escape()
    .isLength({ max: 120 })
    .withMessage("Maximum character length exceeds"),
  body("content")
    .optional()
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

  body("tags").optional().isArray().withMessage("Tags must be an array"),

  body("tags.*")
    .optional()
    .notEmpty()
    .withMessage("Tags cannot be empty")
    .isLength({ max: 50 })
    .withMessage("Each tag must be at most 50 characters")
    .trim()
    .escape(),
];

export const deletePostValidation = [query("id").notEmpty().escape()];

export const getPostValidation = [
  query("search")
    .optional()
    .trim()
    .matches(/^[\w\s.,-]*$/) // letters, numbers, underscore, space, comma, dot, dash
    .withMessage("Search query contains invalid characters")
    .isLength({ max: 100 }),
  query("page").isInt().withMessage("page must be a number"),
  query("limit").isInt().withMessage("limit must be a number"),
  query("sortType")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("sortType must be 'asc' or 'desc'."),
];


