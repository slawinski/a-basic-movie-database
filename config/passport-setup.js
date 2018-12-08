const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const keys = require("./keys");
const knex = require("../db/knex");

passport.serializeUser((user, done) => {
  done(null, user);
  // done(null, user.id);
});

passport.deserializeUser((user, done) => {
  done(null, user);

  // knex("users")
  //   .where("id", id)
  //   .then(user => {
  //     done(null, user);
  //   })
  //   .catch(err => {
  //     done(err, null);
  //   });
});

passport.use(
  new GoogleStrategy(
    {
      // option for the strategy
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
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
            done(null, currentUser);
          } else {
            knex("users")
              .insert(user)
              .then(newUser => {
                console.log(`created user ${user.username}`);
                done(null, newUser);
              });
          }
        });
    }
  )
);
