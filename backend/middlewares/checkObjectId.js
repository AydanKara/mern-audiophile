import { isValidObjectId } from "mongoose";
import { errorHandler } from "../utils/error.js";

function checkObjectId(req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    return next(errorHandler(404, `Invalid ObjectId of:  ${req.params.id}`));
  }
  next();
}

export default checkObjectId;
