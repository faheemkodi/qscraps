import mongoose from 'mongoose';

const listingSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
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
        required: true,
      },
    ],
    category: [
      {
        type: mongoose.Schema.Types.String,
        ref: 'Category',
        required: true,
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
