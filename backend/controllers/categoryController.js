import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';

// @desc Fetch all categories
// @route GET/api/categories
// @access Public route
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({}).exec();

  res.json(categories);
});

export { getCategories };
