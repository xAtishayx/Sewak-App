const Review = require("../models/Review");
const User = require("../models/User");
const express = require("express");

const router = express.Router();

router.post("/reviewpost", function (req, res) {
  const { message, hospitalID, userID, userName } = req.body;
  const voteArray = [];
  const review = new Review({
    message,
    hospitalID,
    userID,
    voteArray,
    userName
  });
  console.log(review);
  review.save(function (err, doc) {
    if (err) {
      console.log(err);
      res.status(500).send("Error registering new hospital please try again.");
    } else {
      res.send(doc);
    }
  });
});

router.post("/updateVote", async (req, res) => {
  console.log(req.body);
  const { by, vote, reviewId, userName} = req.body;
  Review.findOne({ _id: reviewId }, async function (err, review) {
    if (err) {
      res.status(500).send({ message: "review not found" });
      return;
    }
    const isAlreadyReview = review.voteArray.findIndex((x) => x.by == by);
    if (isAlreadyReview >= 0) {
      review.voteArray[isAlreadyReview].vote = vote;
    } else {
      review.voteArray.push({ by, vote, userName });
    }
    // console.log(review)
    await review.save();
    res.sendStatus(200);
  });
});

router.post("/getreviews", function (req, res) {
  const { id } = req.body;

  Review.find({ hospitalID: id }, function (err, reviews) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.send({ reviews });
  });
});

module.exports = router;
