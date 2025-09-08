const bcrypt = require("bcryptjs");
const asyncHandler = require("../utils/asyncHandler");
const userModel = require("../models/User");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Check for empty fields
  if (!username) {
    return res.status(400).json({ success: false, message: "Username is required" });
  }
  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ success: false, message: "Password is required" });
  }

  // Validate email format
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email format" });
  }

  // Check if user exists
  let existingUser = await userModel.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists with this username or email",
    });
  }

  // Hash password
  const hashPassword = await bcrypt.hash(password, 10);

  // Create user
  const newUser = await userModel.create({
    username,
    email,
    password: hashPassword,
  });

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    },
  });
});

module.exports = { registerUser };
