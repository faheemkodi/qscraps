import mongoose from 'mongoose';

const listingSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    make: {
      type: mongoose.Schema.Types.String,
      ref: 'Make',
      trim: true,
    },
    model: {
      type: mongoose.Schema.Types.String,
      ref: 'Model',
      trim: true,
    },
    year: [
      {
        type: mongoose.Schema.Types.String,
        ref: 'Year',
      },
    ],
    category: [
      {
        type: mongoose.Schema.Types.String,
        ref: 'Category',
      },
    ],
    coverImage: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    vendorName: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Vendor',
    },
    primaryContactNo: {
      type: mongoose.Schema.Types.String,
      required: true,
      ref: 'Vendor',
    },
    alternateContactNo: {
      type: mongoose.Schema.Types.String,
      required: true,
      ref: 'Vendor',
    },
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
