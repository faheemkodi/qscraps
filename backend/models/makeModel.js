import mongoose from 'mongoose';

const makeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Make = mongoose.model('Make', makeSchema);

export default Make;
