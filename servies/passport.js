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
      callbackURL: "/auth/facebook/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log("Accesss Token ", accessToken);
      // console.log("Refresh Tonken ", refreshToken);
      // console.log("Facebook Profile ", profile);

      const existingUser = await User.findOne({ ProfileId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
        // console.log("Facebook Id is already exist ", profile.id);
      }
      const user = new User({
        ProfileId: profile.id,
        DisplayName: profile.displayName,
        Provider: profile.provider
      }).save();
      done(null, user);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },

    async (accessToken, refreshToken, profile, done) => {
      // console.log("Accesss Token ", accessToken);
      // console.log("Refresh Tonken ", refreshToken);
      // console.log("Google Profile ", profile);

      const existingUser = await User.findOne({ ProfileId: profile.id });
      if (existingUser) {
        // We already have a record with the given profile ID
        return done(null, existingUser);
        // console.log("Google ID is already exist ", profile.id);
      }
      // We don't have a user record with thid ID, make a new record!
      const user = await new User({
        ProfileId: profile.id,
        DisplayName: profile.displayName,
        Provider: profile.provider,
        EmailId: profile.emails[0].value
      }).save();
      done(null, user);
    }
  )
);
