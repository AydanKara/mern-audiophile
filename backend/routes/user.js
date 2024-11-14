import express from "express";
import {
  deleteUser,
  deleteUserAdmin,
  getAllUsers,
  updateAdminStatus,
  updateUser,
} from "../controllers/user.js";
import { verifyToken } from "../middlewares/verifyUser.js";
import { updateChain } from "../middlewares/validationChains.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import checkObjectId from "../middlewares/checkObjectId.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.get("/", verifyToken, verifyAdmin, getAllUsers);
router
  .route("/update/:id")
  .patch(checkObjectId, verifyToken, verifyAdmin, updateAdminStatus)
  .post(checkObjectId, verifyToken, updateChain(), validateRequest, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.delete(
  "/admin/delete/:id",
  checkObjectId,
  verifyToken,
  verifyAdmin,
  deleteUserAdmin
);

export default router;
