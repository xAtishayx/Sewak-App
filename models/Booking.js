const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  hospitalID: { type: mongoose.SchemaTypes.ObjectId, required: true },
  userID: { type: mongoose.SchemaTypes.ObjectId, required: true },
  userName: { type: String, required: true },
  bookingTime: { type: String, required: true },
  bookingDate: { type: Date, required: true },
  status: { type: Number, default: 0 },
  remark: { type: String },
});

module.exports = mongoose.model("Booking", BookingSchema);
