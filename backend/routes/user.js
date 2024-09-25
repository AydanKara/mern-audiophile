import express from "express";
import { deleteUser, test, updateUser } from "../controllers/user.js";
import { verifyToken } from "../utils/verifyUser.js";
import { updateChain } from "../middlewares/validationChains.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

router.get("/test", test);
router.post(
  "/update/:id",
  verifyToken,
  updateChain(),
  validateRequest,
  updateUser
);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
