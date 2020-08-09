const Booking = require("../models/Booking");
const express = require("express");

const router = express.Router();

router.post("/new", function (req, res) {
  const { bookingTime, hospitalID, userID, userName, remark, bookingDate } = req.body;
  const booking = new Booking({
    bookingTime,
    hospitalID,
    userID,
    userName,
    remark,
    bookingDate
  });

  booking.save(function (err, doc) {
    if (err) {
      console.log(err);
      res.status(500).send("Error registering new hospital please try again.");
    } else {
      res.send(doc);
    }
  });

});

router.post("/update", async (req, res) => {
  console.log(req.body);
  const { id, status } = req.body;
  Booking.findOne({ _id: id }, async function (err, booking) {
    if (err) {
      res.status(500).send({ message: "booking not found" });
      return;
    }
    booking.status = status;
    await booking.save();
    res.sendStatus(200);
  });
});

router.post("/all", function (req, res) {
  const { hospitalID } = req.body;

  Booking.find({ hospitalID }, function (err, bookings) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.send({ bookings });
  });
});

module.exports = router;
