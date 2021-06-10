import asyncHandler from 'express-async-handler';
import Listing from '../models/listingModel.js';

// @desc Fetch all listings + search
// @route GET/api/listings
// @access Public route
const getListings = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const make = req.query.make ? { make: req.query.make } : {};

  const model = req.query.model ? { model: req.query.model } : {};

  const year = req.query.year ? { year: req.query.year } : {};

  const category = req.query.category ? { category: req.query.category } : {};

  const listings = await Listing.find({
    ...keyword,
    ...make,
    ...model,
    ...year,
    ...category,
  });

  res.json(listings);
});

// @desc Fetch a single listing by _id
// @route GET/api/listings/:id
// @access Public route
const getListingById = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id).exec();

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
    title: 'Sample title',
    description: 'Sample description',
    make: 'Honda',
    model: 'Accord',
    year: [2000, 2001, 2002],
    category: ['All parts', 'Engine Parts'],
    coverImage: '/images/1_img_1.jpg',
    images: [
      '/images/1_img_1.jpg',
      '/images/1_img_2.jpg',
      '/images/1_img_3.jpg',
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
  const listings = await Listing.find({ vendorName: req.vendor._id }).exec();

  res.json(listings);
});

export {
  getListings,
  getListingById,
  getMyListings,
  deleteListing,
  createListing,
  updateListing,
};
