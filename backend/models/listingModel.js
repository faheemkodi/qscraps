import mongoose from 'mongoose';

const listingSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    make: {
      type: mongoose.Schema.Types.String,
      ref: 'Make',
      required: true,
    },
    model: {
      type: mongoose.Schema.Types.String,
      ref: 'Model',
      required: true,
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
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
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
