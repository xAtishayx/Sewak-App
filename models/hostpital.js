const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema({
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
  password: {
    type: String,
    trim: true,
  },
  location: {
    latitude: {
      type: String,
      trim: true,
    },
    longitude: {
      type: String,
      trim: true,
    },
  },
  accessToken: [String],
});

module.exports = mongoose.model("Hospital", HospitalSchema);
