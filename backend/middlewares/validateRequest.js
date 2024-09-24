import { validationResult } from "express-validator";

export const validateRequest = (req, res, next) => {
  const validation = validationResult(req);
  
  if (validation.errors.length) {
    // Map errors to have a 'field' and 'message' format
    const extractedErrors = validation.array().map((err) => ({
      field: err.path, // 'path' contains the field name
      message: err.msg, // 'msg' contains the actual error message
    }));

    return res.status(400).json({ errors: extractedErrors });
  }
  next();
};
