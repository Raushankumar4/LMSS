const bcrypt = require("bcryptjs");
const asyncHandler = require("../utils/asyncHandler");
const userModel = require("../models/user.model");
const generateToken = require("../utils/generateToken");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Check for empty fields
  if (!username) {
    return res
      .status(400)
      .json({ success: false, message: "Username is required" });
  }
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ success: false, message: "Password is required" });
  }
  if (password.length < 10) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 10 characters long",
    });
  }

  // Validate email format
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format" });
  }

  // Check if user exists
  let existingUser = await userModel.findOne({
    $or: [{ email }, { username }],
  });
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

const login = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ success: false, message: "Password is required" });
  }
  if (!role) {
    return res
      .status(400)
      .json({ success: false, message: "Role is required" });
  }

  const existUser = await userModel.findOne({ email });

  if (!existUser) {
    return res.status(404).json({
      success: false,
      message: "Email does not exist. Please create an account first.",
    });
  }

  if (existUser.role !== role) {
    return res.status(403).json({
      success: false,
      message: "Role does not match.",
    });
  }

  const comparedPassword = await bcrypt.compare(password, existUser.password);

  if (!comparedPassword) {
    return res.status(401).json({
      success: false,
      message: "Wrong password!",
    });
  }

  const token = generateToken(existUser);

  return res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    user: {
      id: existUser._id,
      email: existUser.email,
      role: existUser.role,
    },
  });
});

module.exports = { registerUser, login };
