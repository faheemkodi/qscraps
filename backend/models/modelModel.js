import mongoose from 'mongoose';

const modelSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    parent: {
      type: mongoose.Schema.Types.String,
      ref: 'Make',
      required: true,
    },
  },
  { timestamps: true }
);

const Model = mongoose.model('Model', modelSchema);

export default Model;
