import asyncHandler from 'express-async-handler';
import Model from '../models/modelModel.js';

// @desc Fetch all models
// @route GET/api/makes/models
// @access Public route
const getModels = asyncHandler(async (req, res) => {
  const models = await Model.find({});

  res.json(models);
});

export { getModels };
