const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const keys = require("./keys");

passport.use(
  new GoogleStrategy(
    {
      // option for the strategy
      clientID: keys.clientID,
      clientSecret: keys.clientSecret,
      callbackURL: "auth/google/redirect"
    },
    () => {
      // passport callback function
    }
  )
);
