require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
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
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
      proxy: true
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
