import asyncHandler from 'express-async-handler';
import Make from '../models/makeModel.js';

// @desc Fetch all makes
// @route GET/api/makes
// @access Public route
const getMakes = asyncHandler(async (req, res) => {
  const makes = await Make.find({});

  res.json(makes);
});

export { getMakes };
