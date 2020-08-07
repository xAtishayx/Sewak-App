const Review = require("../models/Review");
const User = require("../models/User");
const express = require("express");

const router = express.Router();

router.post("/reviewpost", function(req, res) {
  const { message, hospitalID, userID } = req.body;
  var upvoteCount = 0;
  var downvoteCount = 0;
  var upvoteArray = [];
  var downvoteArray = [];
  const review = new Review({
    message,
    hospitalID,
    userID,
    upvoteCount,
    downvoteCount,
    upvoteArray,
    downvoteArray
  });
  console.log(review);
  review.save(function(err, doc) {
    if (err) {
      console.log(err);
      res.status(500).send("Error registering new hospital please try again.");
    } else {
      res.send(doc);
    }
  });
});

router.post("/getcomments", function(req, res) {
  const { id } = req.body;

  Review.find({ hospitalID: id }, function(err, r) {
    if (err) return console.log(err);
    var arr = [];
    // console.log(r);
    if (r) {
      var l = r.length;
      var t = 0;
      r.forEach(e => {
        var msg = e.message;
        console.log(e);
        User.findById(e.userID).then(a => {
          //console.log(a);
          let u = {
            id: a._id,
            name: a.name,
            comment: msg,
            date: "26-03-12",
            upvoteCount: e.upvoteCount,
            downvoteCount: e.downvoteCount,
            upvoteArray: e.upvoteArray,
            downvoteArray: e.downvoteArray
          };
          arr.push(u);
          t = t + 1;
          //     console.log(t);
          if (l == t) {
            //   console.log(arr);
            res.send(arr);
          }
        });
      });
    }
  });
});

router.put("/updatecount", (req, res) => {
  const {
    votername,
    hospitalID,
    userID,
    message,
    upvoteCount,
    downvoteCount
  } = req.body;

  Review.find({ message }, function(err, r) {
    if (err) return console.log(err);
    var l = r.length;
    for (var i = 0; i < l; i++) {
      var ele = r[i];
      //  console.log(ele);
      if (ele.hospitalID == hospitalID && ele.userID == userID) {
        console.log("hi");
        const _id = ele._id;
        if (upvoteCount) {
          var upcount = ele.upvoteCount + 1;
          var addupname = true;
        } else {
          var upcount = ele.upvoteCount;
        }
        if (downvoteCount) {
          var downcount = ele.downvoteCount + 1;
          addupname = false;
        } else {
          var downcount = ele.downvoteCount;
        }

        Review.findByIdAndUpdate(
          _id,
          {
            downvoteCount: downcount,
            upvoteCount: upcount,
            $push: addupname
              ? { upvoteArray: votername }
              : { downvoteArray: votername }
          },
          function(err, result) {
            if (err) return console.log(err);
            console.log(result);
          }
        );
      }
    }
    res.status(200).send("OK");
  });
});
module.exports = router;
