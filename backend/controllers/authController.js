


import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// Mail setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vm45231@gmail.com",
    pass: "ybsr hmch uxrc ynnu",
  },
});


// ====================== SIGNUP ======================
export const signup = async (req, res) => {
  try {
    console.log("🔹 Signup request body:", req.body);

    const { email, password } = req.body;

   
    let user = await User.findOne({ email });
    console.log("🔹 Existing user:", user);

    if (!user) {
      return res.status(400).json({ message: "User does not exist. Contact library admin." });
    }

   
    if (user.isVerified) {
      return res.status(400).json({ message: "User already registered. Please login." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔹 Password hashed successfully");

   
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("🔹 Generated OTP:", otp);

   
    user.password = hashedPassword;
    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min expiry

    await user.save();
    console.log("✅ User updated with password & OTP:", user._id);

    
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Verify your account for vimmi.com",
      text: `Your OTP is ${otp}`,
    });
    console.log("📧 OTP email sent to:", email);

    res.json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ error: err.message });
  }
};


export const verifyOtp = async (req, res) => {
  try {
    console.log("🔹 Verify OTP request body:", req.body);

    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    console.log("🔹 User found for verification:", user?._id);

    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      console.log("❌ Invalid or expired OTP");
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Verify user
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    console.log("✅ User verified:", user._id);

    res.json({ message: "Account verified successfully" });
  } catch (err) {
    console.error("❌ Verify OTP error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ====================== SIGNIN ======================
export const signin = async (req, res) => {
  try {
    console.log("🔹 Signin request body:", req.body);

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("🔹 User found for signin:", user?._id);

    if (!user) return res.status(400).json({ message: "User not found" });

    if (!user.isVerified) {
      console.log("❌ User not verified");
      return res.status(400).json({ message: "Please verify your email first" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔹 Password match:", isMatch);

    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );
    console.log("✅ JWT generated for user:", user._id);

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, studentLiberaryId: user.studentLiberaryId }
    });
  } catch (err) {
    console.error("❌ Signin error:", err);
    res.status(500).json({ error: err.message });
  }
};