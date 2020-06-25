const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const withAuth = require("./middlewares/auth");
require("./db/mongoose");
const user = require("./routes/user");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/public", "index.html"));
});

app.use("/api/user", user);

app.get("/api/checkToken", withAuth, function (req, res) {
  res.sendStatus(200);
});

app.get("/api/", withAuth, function (req, res) {
  res.send("Welcome!");
});

const port = 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
