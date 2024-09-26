import { isValidObjectId } from "mongoose";

function checkObjectId(req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    return next(404, `Invalid ObjectId of:  ${req.params.id}`);
  }
  next();
}

export default checkObjectId;
