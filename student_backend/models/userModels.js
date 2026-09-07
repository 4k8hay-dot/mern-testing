const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  registerNo: {
    type: Number,
    required: true,
    unique: true,
  },

  candidateName: {
    type: String,
    required: true,
  },

  course: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  mark: {
    type: Number,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);