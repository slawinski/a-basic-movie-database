const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const keys = require("./keys");
const knex = require("../db/knex");

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
      const user = {
        username: profile.displayName
      };
      knex("users")
        .where("username", user)
        .then(currentUser => {
          if (currentUser) {
            console.log(`>>>>>>> User ${user.username} already exists`);
          } else {
            knex("users")
              .insert(user)
              .then(() => {
                console.log(`created user ${user.username}`);
              });
          }
        });
    }
  )
);
