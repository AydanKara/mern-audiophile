import express from "express";
import { verifyToken } from "../middlewares/verifyUser.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categories.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import checkObjectId from "../middlewares/checkObjectId.js";

const router = express.Router();

router.get("/", getAllCategories);
router
  .route("/:id")
  .get(checkObjectId, getCategoryById)
  .put(checkObjectId, verifyToken, verifyAdmin, updateCategory)
  .delete(checkObjectId, verifyToken, verifyAdmin, deleteCategory);

router.post("/create", verifyToken, verifyAdmin, createCategory);

export default router;
