const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const keys = require("../Config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: "/auth/facebook/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log("Accesss Token ", accessToken);
      // console.log("Refresh Tonken ", refreshToken);
      // console.log("Facebook Profile ", profile);

      User.findOne({ ProfileId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
          // console.log("Facebook Id is already exist ", profile.id);
        } else {
          new User({
            ProfileId: profile.id,
            displayName: profile.displayName,
            Provider: profile.provider
          })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },

    (accessToken, refreshToken, profile, done) => {
      // console.log("Accesss Token ", accessToken);
      // console.log("Refresh Tonken ", refreshToken);
      // console.log("Google Profile ", profile);

      User.findOne({ ProfileId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
          // console.log("Google ID is already exist ", profile.id);
        } else {
          new User({
            ProfileId: profile.id,
            displayName: profile.displayName,
            Provider: profile.provider
          })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
