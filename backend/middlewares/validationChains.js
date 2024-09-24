import { check } from "express-validator";

export const registerChain = () => [
  check("username")
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage("Username should be between 2 and 20 characters long"),
  check("email")
    .trim()
    .isEmail()
    .isLength({ min: 10 })
    .withMessage("Email must be at least 10 characters long"),
  check("password")
    .trim()
    .isLength({ min: 4 })
    .withMessage("Passwords must be at least 4 characters long"),
  check("repass")
    .trim()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
];

export const loginChain = () => [
  check("email")
    .isEmail()
    .isLength({ min: 10 })
    .withMessage("Email must be at least 10 characters long")
    .trim(),
  check("password")
    .isLength({ min: 4 })
    .withMessage("Passwords must be at least 4 characters long")
    .trim(),
];

export const createChain = () => [
  check("title")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Title should be at least 2 characters long"),
  check("description")
    .trim()
    .isLength({ min: 10, max: 100 })
    .withMessage("Description should be between 10 and 100 characters long"),
  check("ingredients")
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage("Ingredients should be between 10 and 200 characters long"),
  check("instructions")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Instructions should be at least 10 characters long"),
  check("image")
    .trim()
    .isURL({ require_tld: false })
    .withMessage("Image should be a valid URL"),
];

export const editChain = () => [
  check("title")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Title should be at least 2 characters long"),
  check("description")
    .trim()
    .isLength({ min: 10, max: 100 })
    .withMessage("Description should be between 10 and 100 characters long"),
  check("ingredients")
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage("Ingredients should be between 10 and 200 characters long"),
  check("instructions")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Instructions should be at least 10 characters long"),
  check("image")
    .trim()
    .isURL({ require_tld: false })
    .withMessage("Image should be a valid URL"),
];
