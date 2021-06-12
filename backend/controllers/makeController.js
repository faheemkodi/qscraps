import asyncHandler from 'express-async-handler';
import Make from '../models/makeModel.js';
import Model from '../models/modelModel.js';

// @desc Fetch all makes
// @route GET/api/makes
// @access Public route
const getMakes = asyncHandler(async (req, res) => {
  const makes = await Make.find({});

  res.json(makes);
});

// @desc Fetch models by make
// @route GET/api/makes/models/:make
// @access Public route
const getMakeModels = asyncHandler(async (req, res) => {
  const models = await Model.find({ parent: req.params.make }).exec();

  if (models) {
    res.json(models);
  } else {
    res.status(404);
    throw new Error('Models not found for the selected make!');
  }
});

export { getMakes, getMakeModels };
