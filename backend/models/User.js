/*
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  studentLiberaryId: { type: String, unique:true },
  password: { type: String,  },
  isVerified: { type: Boolean, default: false },
   role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  otp: String,
  otpExpiry: Date,
});

export default mongoose.model("User", userSchema);
*/

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  studentLiberaryId: { type: String, unique: true },
  password: { type: String },
  contact: { type: String },
  isVerified: { type: Boolean, default: false },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user", // 👈 normal students are "user"
  },

  otp: String,
  otpExpiry: Date,

  // 👇 add a createdAt field to track registration time
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model("User", userSchema);
