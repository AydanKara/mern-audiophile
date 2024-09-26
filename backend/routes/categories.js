import express from "express";
import { verifyToken } from "../middlewares/verifyUser.js";
import { createCategory, getAllCategories } from "../controllers/categories.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.get("/", getAllCategories);
router.post("/create", verifyToken, verifyAdmin, createCategory);

export default router;
