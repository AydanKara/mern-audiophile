import express from "express";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/user.js";
import { verifyToken } from "../middlewares/verifyUser.js";
import { updateChain } from "../middlewares/validationChains.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import checkObjectId from "../middlewares/checkObjectId.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.get("/", verifyToken, verifyAdmin, getAllUsers);
router.post(
  "/update/:id",
  checkObjectId,
  verifyToken,
  updateChain(),
  validateRequest,
  updateUser
);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
