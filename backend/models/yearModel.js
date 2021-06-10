import mongoose from 'mongoose';

const yearSchema = mongoose.Schema(
  {
    makeYear: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Year = mongoose.model('Year', yearSchema);

export default Year;
