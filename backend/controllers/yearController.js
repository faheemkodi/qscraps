import asyncHandler from 'express-async-handler';
import Year from '../models/yearModel.js';

// @desc Fetch all years
// @route GET/api/years
// @access Public route
const getYears = asyncHandler(async (req, res) => {
  const years = await Year.find({});

  res.json(years);
});

export { getYears };
