const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const keys = require("./keys");

passport.use(
  new GoogleStrategy(
    {
      // option for the strategy
      clientID: keys.clientID,
      clientSecret: keys.clientSecret,
      callbackURL: "http://localhost:3000/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      console.log(">>>>>>>>>>>>>>>>>> passport callback function fired");
      console.log(profile);
    }
  )
);
