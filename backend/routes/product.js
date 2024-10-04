import express from "express";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getFeaturedProductsByName,
  getLatestProduct,
  getProductById,
  getProductsByCategory,
  getRandomProducts,
  updateProductById,
} from "../controllers/product.js";
import { verifyToken } from "../middlewares/verifyUser.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import checkObjectId from "../middlewares/checkObjectId.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/latest", getLatestProduct);
router.get("/featured", getFeaturedProductsByName);
router.get("/random", getRandomProducts);
router.get("/catalog/:category", getProductsByCategory);
router
  .route("/:id")
  .get(checkObjectId, getProductById)
  .put(checkObjectId, verifyToken, verifyAdmin, updateProductById)
  .delete(checkObjectId, verifyToken, verifyAdmin, deleteProductById);

router.post("/create", verifyToken, createProduct);

export default router;
