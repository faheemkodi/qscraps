import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Vendor from '../models/vendorModel.js';

// @desc Auth vendor & ultimately get a token
// @route POST/api/vendors/login
// @access Public
const authVendor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const vendor = await Vendor.findOne({ email });

  if (vendor && (await vendor.matchPassword(password))) {
    res.json({
      _id: vendor._id,
      vendorName: vendor.vendorName,
      email: vendor.email,
      isAdmin: vendor.isAdmin,
      token: generateToken(vendor._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc Register a new vendor
// @route POST/api/vendors
// @access Public

const registerVendor = asyncHandler(async (req, res) => {
  const {
    vendorName,
    email,
    password,
    primaryContactNo,
    alternateContactNo,
    companyRegistration,
    address,
  } = req.body;

  const vendorExists = await Vendor.findOne({ email });

  if (vendorExists) {
    res.status(400);
    throw new Error('Vendor already exists');
  }

  const vendor = await Vendor.create({
    vendorName,
    email,
    password,
    primaryContactNo,
    alternateContactNo,
    companyRegistration,
    address,
  });

  if (vendor) {
    res.status(201).json({
      _id: vendor._id,
      vendorName: vendor.vendorName,
      email: vendor.email,
      isAdmin: vendor.isAdmin,
      token: generateToken(vendor._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid vendor data');
  }
});

// @desc Get vendor profile
// @route GET/api/vendors/profile
// @access Private

const getVendorProfile = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.vendor._id);

  if (vendor) {
    res.json({
      _id: vendor._id,
      vendorName: vendor.vendorName,
      email: vendor.email,
      primaryContactNo: vendor.primaryContactNo,
      alternateContactNo: vendor.alternateContactNo,
      companyRegistration: vendor.companyRegistration,
      address: vendor.address,
      isAdmin: vendor.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('Vendor not found');
  }
});

// @desc Update vendor profile
// @route PUT /api/vendors/profile
// @access Private

const updateVendorProfile = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.vendor._id);

  if (vendor) {
    vendor.vendorName = req.body.vendorName || vendor.vendorName;
    vendor.email = req.body.email || vendor.email;
    vendor.primaryContactNo =
      req.body.primaryContactNo || vendor.primaryContactNo;
    vendor.alternateContactNo =
      req.body.alternateContactNo || vendor.alternateContactNo;
    vendor.companyRegistration =
      req.body.companyRegistration || vendor.companyRegistration;
    vendor.address = req.body.address || vendor.address;
    if (req.body.password) {
      vendor.password = req.body.password;
    }

    const updatedVendor = await vendor.save();

    res.json({
      _id: updatedVendor._id,
      vendorName: updatedVendor.vendorName,
      email: updatedVendor.email,
      primaryContactNo: updatedVendor.primaryContactNo,
      alternateContactNo: updatedVendor.alternateContactNo,
      companyRegistration: updatedVendor.companyRegistration,
      address: updatedVendor.address,
      isAdmin: updatedVendor.isAdmin,
      token: generateToken(updatedVendor._id),
    });
  } else {
    res.status(404);
    throw new Error('Vendor not found');
  }
});

// @desc Get all vendors
// @route GET/api/vendors
// @access Private/Admin

const getVendors = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Vendor.countDocuments({}).exec();
  const vendors = await Vendor.find({})
    .sort({ createdAt: 'desc' })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ vendors, page, pages: Math.ceil(count / pageSize) });
});

// @desc Delete vendor
// @route DELETE/api/vendors/:id
// @access Private/Admin

const deleteVendor = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);

  if (vendor) {
    await vendor.remove();
    res.json({ message: 'Vendor removed' });
  } else {
    res.status(404);
    throw new Error('Vendor not found');
  }
});

// @desc Get vendor by ID
// @route GET/api/vendors/:id
// @access Private/Admin

const getVendorById = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.params.id).select('-password');
  if (vendor) {
    res.json(vendor);
  } else {
    res.status(404);
    throw new Error('Vendor not found');
  }
});

// @desc Update any vendor
// @route PUT /api/vendors/:id
// @access Private/Admin

const updateVendor = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);

  if (vendor) {
    vendor.vendorName = req.body.vendorName || vendor.vendorName;
    vendor.email = req.body.email || vendor.email;
    vendor.primaryContactNo =
      req.body.primaryContactNo || vendor.primaryContactNo;
    vendor.alternateContactNo =
      req.body.alternateContactNo || vendor.alternateContactNo;
    vendor.companyRegistration =
      req.body.companyRegistration || vendor.companyRegistration;
    vendor.address = req.body.address || vendor.address;
    vendor.isAdmin = req.body.isAdmin || vendor.isAdmin;
    if (req.body.password) {
      vendor.password = req.body.password;
    }

    const updatedVendor = await vendor.save();

    res.json({
      _id: updatedVendor._id,
      vendorName: updatedVendor.vendorName,
      email: updatedVendor.email,
      primaryContactNo: updatedVendor.primaryContactNo,
      alternateContactNo: updatedVendor.alternateContactNo,
      companyRegistration: updatedVendor.companyRegistration,
      address: updatedVendor.address,
      isAdmin: updatedVendor.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('Vendor not found');
  }
});

export {
  authVendor,
  registerVendor,
  getVendorProfile,
  updateVendorProfile,
  getVendors,
  deleteVendor,
  getVendorById,
  updateVendor,
};
