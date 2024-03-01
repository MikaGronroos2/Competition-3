const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
});

// static signup method
userSchema.statics.signup = async function (
  username,
  email,
  password,
  dateOfBirth,
  phoneNumber
) {
  // validation
  if (!username || !email || !password || !dateOfBirth || !phoneNumber) {
    throw Error("All fields must be filled");
  }
  const exists = await this.findOne({ username });
  if (exists) {
    throw Error("Email, username, or phone number already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    username,
    email,
    password: hash,
    dateOfBirth,
    phoneNumber,
  });

  const returnedUser = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };
  return returnedUser;
};

// static login method
userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ username });
  if (!user) {
    throw Error("Incorrect username or password");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect username or password");
  }

  const returnedUser = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };
  return returnedUser;
};

module.exports = mongoose.model("User", userSchema);
