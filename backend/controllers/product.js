import Product from "../models/Product.js";

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
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    console.log(product);
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
