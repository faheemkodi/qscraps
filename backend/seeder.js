import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import vendors from './data/vendors.js';
import listings from './data/listings.js';
import makes from './data/makes.js';
import models from './data/models.js';
import years from './data/years.js';
import categories from './data/categories.js';

import Vendor from './models/vendorModel.js';
import Listing from './models/listingModel.js';
import Make from './models/makeModel.js';
import Model from './models/modelModel.js';
import Year from './models/yearModel.js';
import Category from './models/categoryModel.js';

import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Vendor.deleteMany();
    await Listing.deleteMany();
    await Make.deleteMany();
    await Model.deleteMany();
    await Year.deleteMany();
    await Category.deleteMany();

    const createdVendors = await Vendor.insertMany(vendors);
    const createdMakes = await Make.insertMany(makes);
    const createdModels = await Model.insertMany(models);
    const createdYears = await Year.insertMany(years);
    const createdCategories = await Category.insertMany(categories);

    const adminVendor = createdVendors[0]._id;
    const adminPrimaryContact = createdVendors[0].primaryContactNo;
    const adminAlternateContact = createdVendors[0].alternateContactNo;

    const sampleMake = createdMakes[0].name;
    const sampleModel = createdModels[0].name;
    const sampleYear = [createdYears[10].makeYear, createdYears[20].makeYear];
    const sampleCategory = [
      createdCategories[3].name,
      createdCategories[4].name,
    ];

    const sampleListings = listings.map((listing) => {
      return {
        ...listing,
        vendorName: adminVendor,
        primaryContactNo: adminPrimaryContact,
        alternateContactNo: adminAlternateContact,
        make: sampleMake,
        model: sampleModel,
        year: sampleYear,
        category: sampleCategory,
      };
    });

    await Listing.insertMany(sampleListings);

    console.log('Data imported'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Vendor.deleteMany();
    await Listing.deleteMany();
    await Make.deleteMany();
    await Model.deleteMany();
    await Year.deleteMany();
    await Category.deleteMany();

    console.log('Data destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
