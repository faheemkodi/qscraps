import asyncHandler from 'express-async-handler';
import Listing from '../models/listingModel.js';

// @desc Fetch all listings + filter by params
// @route GET/api/listings
// @access Public route
const getListings = asyncHandler(async (req, res) => {
  const pageSize = 15;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        $or: [
          { title: { $regex: req.query.keyword, $options: 'i' } },
          { description: { $regex: req.query.keyword, $options: 'i' } },
          { make: { $regex: req.query.keyword, $options: 'i' } },
          { model: { $regex: req.query.keyword, $options: 'i' } },
        ],
      }
    : {};

  const make = req.query.make ? { make: req.query.make } : {};

  const model = req.query.model ? { model: req.query.model } : {};

  const year = req.query.year
    ? { year: { $regex: req.query.year, $options: 'i' } }
    : {};

  const category = req.query.category
    ? { category: { $regex: req.query.category, $options: 'i' } }
    : {};

  const count = await Listing.countDocuments({
    ...keyword,
    ...make,
    ...model,
    ...year,
    ...category,
  }).exec();
  const listings = await Listing.find({
    ...keyword,
    ...make,
    ...model,
    ...year,
    ...category,
  })
    .sort({ createdAt: 'desc' })
    .populate('vendorName', 'vendorName address')
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .exec();

  res.json({
    listings,
    page,
    pages: Math.ceil(count / pageSize),
  });
});

// @desc Fetch a single listing by _id
// @route GET/api/listings/:id
// @access Public route
const getListingById = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id)
    .populate('vendorName', 'vendorName address')
    .exec();

  if (listing) {
    res.json(listing);
  } else {
    res.status(404);
    throw new Error('Listing not found');
  }
});

// @desc Delete any product
// @route DELETE/api/listings/:id
// @access Private/Admin
// TODO - Delete product vendor specific - check - if req.vendor._id === listing.vendor._id
const deleteListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id).exec();

  if (listing) {
    await listing.remove();
    res.json({ message: 'Listing removed' });
  } else {
    res.status(404);
    throw new Error('Listing not found');
  }
});

// @desc Create a listing
// @route POST/api/listings
// @access Private
const createListing = asyncHandler(async (req, res) => {
  const listing = new Listing({
    title: 'New Listing',
    description: 'Add a description',
    make: '',
    model: '',
    year: [''],
    category: [''],
    coverImage: '/images/sample-image.jpg',
    images: [
      '/images/sample-image_a.jpg',
      '/images/sample-image_b.jpg',
      '/images/sample-image_c.jpg',
    ],
    vendorName: req.vendor._id,
    primaryContactNo: req.vendor.primaryContactNo,
    alternateContactNo: req.vendor.alternateContactNo,
  });

  const createdListing = await listing.save();
  res.status(201).json(createdListing);
});

// @desc Update a listing
// @route PUT/api/listings/:id
// @access Private
const updateListing = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    make,
    model,
    year,
    category,
    coverImage,
    images,
    vendorName,
    primaryContactNo,
    alternateContactNo,
  } = req.body;

  const listing = await Listing.findById(req.params.id).exec();

  if (listing) {
    listing.title = title;
    listing.description = description;
    listing.make = make;
    listing.model = model;
    listing.year = year;
    listing.category = category;
    listing.coverImage = coverImage;
    listing.images = images;
    listing.vendorName = vendorName;
    listing.primaryContactNo = primaryContactNo;
    listing.alternateContactNo = alternateContactNo;

    const updatedListing = await listing.save();
    res.json(updatedListing);
  } else {
    res.status(404);
    throw new Error('Listing not found');
  }
});

// @desc Get logged in vendor created listings
// @route GET/api/listings/mylistings
// @access Private
const getMyListings = asyncHandler(async (req, res) => {
  const pageSize = 15;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Listing.countDocuments({
    vendorName: req.vendor._id,
  }).exec();
  const listings = await Listing.find({ vendorName: req.vendor._id })
    .sort({ createdAt: 'desc' })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .exec();

  res.json({ listings, page, pages: Math.ceil(count / pageSize) });
});

export {
  getListings,
  getListingById,
  getMyListings,
  deleteListing,
  createListing,
  updateListing,
};
