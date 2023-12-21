const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema(
   {
      email: { type: String, required: true },
      otp: { type: String, required: true },
      verified: { type: Boolean, default: false },
   },
   { timestamps: true, versionKey: false }
);

const OTPModel = mongoose.model(`OTP'S`, OTPSchema);

module.exports = OTPModel;
