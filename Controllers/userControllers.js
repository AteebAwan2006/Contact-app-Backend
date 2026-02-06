const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Generate Token Function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_SECRET_TOKEN, {
    expiresIn: "7d",
  });
};


//  @desc Register a User
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // 1 Check fields
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  // Check if user already exists
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed password:", hashedPassword);

  //  Create new user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created: ${user}`);

  //  If successful → generate token and send response
  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});


// 🧩 @desc Login User
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid");
  }
});


// 🧩 @desc Get Current User
// @route GET /api/users/current
// @access Private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});


// Export all controllers
module.exports = { registerUser, loginUser, currentUser };
