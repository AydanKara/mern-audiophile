import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import User from "../models/User.js";

export const verifyAdmin = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "Unauthorized"));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");
    console.log(req.user);
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      return next(errorHandler(401, "Not authorized as admin!"));
    }
  } catch (error) {
    return next(errorHandler(401, "Forbidden"));
  }
};
