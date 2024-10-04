import mongoose from "mongoose";
import Product from "../models/Product.js";
import { errorHandler } from "../utils/error.js";

export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).populate("category", "name");

    res.status(200).json(products);
  } catch (error) {
    next(errorHandler(500, "Server error"));
  }
};

export const getRandomProducts = async (req, res, next) => {
  const { excludeId } = req.query;
  console.log(excludeId + "26 line");
  try {
    if (!mongoose.Types.ObjectId.isValid(excludeId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }
    const randomProducts = await Product.aggregate([
      {
        $match: {
          _id: { $ne: new mongoose.Types.ObjectId(excludeId) },
        },
      }, // Exclude the current product
      { $sample: { size: 3 } }, // Randomly select 3 products
      {
        $project: {
          // Only include the required fields
          name: 1,
          image: 1,
          _id: 1,
        },
      },
    ]);

    res.status(200).json(randomProducts);
  } catch (err) {
    console.error(err);
    next(errorHandler(500, "Server error"));
  }
};

export const getFeaturedProductsByName = async (req, res, next) => {
  
  const productNames = req.query.names.split(",") || [];
  
  try {
    const products = await Product.find({ name: { $in: productNames } })
      .limit(3)
      .select("name image");

    res.status(200).json(products);
  } catch (err) {
    next(errorHandler(500, "Server error"));
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return next(errorHandler(404, "Product not found!"));
    }
    res.status(200).json(product);
  } catch (error) {
    next(errorHandler(500, "Server error"));
  }
};

export const updateProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const updates = req.body;

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return next(errorHandler(404, "Product not found!"));
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(errorHandler(500, "Server error"));
  }
};

export const deleteProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return next(errorHandler(404, "Product not found!"));
    }
    res.status(200).json(deletedProduct);
  } catch (error) {
    next(errorHandler(500, "Server error"));
  }
};
