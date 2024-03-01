const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res, next) => {
  const { username, email, password, dateOfBirth, phoneNumber } = req.body;
  console.log(username, email, password, dateOfBirth, phoneNumber);
  try {
    const user = await User.signup(
      username,
      email,
      password,
      dateOfBirth,
      phoneNumber
    );

    // Create Token
    const token = createToken(user._id);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);

    // Create Token
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res, next) => {
  const { authorization } = req.headers

  const token = authorization.split(' ')[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id })
    json.status(200).json({ user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
