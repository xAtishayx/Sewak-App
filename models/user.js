const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    trim: true,
    required: true,
  },
  accessToken: [String],
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  displayPicture: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
