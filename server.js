const express = require("express");
const cors = require("cors");
const passport = require("passport");
require("./db/mongoose");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const keys = require("./config/keys");

const User = require("./models/user");

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));

// Passport Google strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value }, async function (
        err,
        user
      ) {
        if (err) {
          return done(err);
        }
        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            displayPicture: profile.photos[0].value,
          });
          user.accessToken.push(accessToken);
          try {
            user.save();
          } catch (e) {
            return done(e);
          }
        } else if (user) {
          user.accessToken.push(accessToken);
          await user.save();
        }
        return done(err, user);
      });
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const token = req.user.accessToken[req.user.accessToken.length - 1];
    delete req.user.accessToken;
    res.send({
      token,
      user: req.user,
    });
  }
);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
