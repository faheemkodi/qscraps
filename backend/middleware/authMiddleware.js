import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Vendor from '../models/vendorModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.vendor = await Vendor.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const admin = (req, res, next) => {
  if (req.vendor && req.vendor.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized, access to admins only');
  }
};

export { protect, admin };
