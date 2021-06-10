import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const vendorSchema = mongoose.Schema(
  {
    vendorName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    primaryContactNo: {
      type: String,
      required: true,
      unique: true,
    },
    alternateContactNo: {
      type: String,
      required: true,
      unique: true,
    },
    companyRegistration: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

vendorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

vendorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Vendor = mongoose.model('Vendor', vendorSchema);

export default Vendor;
