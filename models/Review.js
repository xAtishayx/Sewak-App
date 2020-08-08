const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  message: { type: String, required: true },
  hospitalID: { type: mongoose.SchemaTypes.ObjectId, required: true },
  userID: { type: mongoose.SchemaTypes.ObjectId, required: true },
  userName: { type: String, required: true },
  upvoteCount: { type: Number, default: 0 },
  downvoteCount: { type: Number, default: 0 },
  voteArray: [
    {
      by: { type: mongoose.SchemaTypes.ObjectId, required: true },
      vote: { type: Boolean, required: true },
      userName: { type: String, required: true },
    },
  ],
  //timestamp : true,
});

module.exports = mongoose.model("Review", ReviewSchema);
