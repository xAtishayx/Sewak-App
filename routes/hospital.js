const Hospital = require("../models/Hospital");
const express = require("express");
const jwt = require("jsonwebtoken");
const withAuth = require("../middlewares/auth");

const router = express.Router();

router.post("/register", function (req, res) {
  const {
    email,
    password,
    name,
    location = {},
    address,
    telephone,
    type = [],
    description,
  } = req.body;
  const hospital = new Hospital({
    email,
    password,
    name,
    location,
    address,
    telephone,
    type,
    description,
  });
  hospital.save(function (err, doc) {
    if (err) {
      console.log(err);
      res.status(500).send("Error registering new hospital please try again.");
    } else {
      const payload = { email };
      const token = jwt.sign(payload, "secret", {
        expiresIn: "1h",
      });
      res.cookie("token", token, { httpOnly: true }).json({ token, hospital });
    }
  });
});

router.post("/login", function (req, res) {
  const { email, password } = req.body;
  Hospital.findOne({ email }, function (err, hospital) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again",
      });
    } else if (!hospital) {
      res.status(401).json({
        error: "Incorrect email or password",
      });
    } else {
      hospital.isCorrectPassword(password, function (err, same) {
        if (err) {
          res.status(500).json({
            error: "Internal error please try again",
          });
        } else if (!same) {
          res.status(401).json({
            error: "Incorrect email or password",
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, "secret", {
            expiresIn: "1h",
          });
          res
            .cookie("token", token, { httpOnly: true })
            .json({ token, hospital });
        }
      });
    }
  });
});

router.get("/all", (req, res) => {
  Hospital.find().then((Hospital) => res.json(Hospital));
  // res.send({});
});

router.get("/protected", withAuth, function (req, res) {
  res.send({ message: "Auth Ok!" });
});

module.exports = router;
