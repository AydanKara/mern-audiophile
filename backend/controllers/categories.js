import Category from "../models/Category.js";
import { errorHandler } from "../utils/error.js";

// Create
export const createCategory = async (req, res, next) => {
  try {
    const { name, img } = req.body;

    const newCategory = new Category({ name, img });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

// Get All Categories
export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

// Read - Single
export const getCategoryById = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    console.log(category);
    if (!category) {
      return next(errorHandler(404, "Category not found!"));
    }
    res.status(200).json(category);
  } catch (error) {
    next(errorHandler(500, "Server error"));
  }
};

// Update
export const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updates = req.body;

    const existingCategory = await Category.findById(categoryId);

    if (!existingCategory) {
      return next(errorHandler(404, "Category not found!"));
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updates,
      { new: true }
    );

    res.status(200).json(updatedCategory);
  } catch (error) {
    next(errorHandler(500, "Server error"));
  }
};

//! Delete

export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return next(errorHandler(404, "Category not found!"));
    }
    res.status(200).json(deletedCategory);
  } catch (error) {
    next(errorHandler(500, "Server error"));
  }
};
