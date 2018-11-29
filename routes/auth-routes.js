const router = require("express").Router();
const passport = require("passport");
const cors = require("cors");

// auth login
router.get("/login", (req, res) => {
  res.render("login");
});

// auth logout

router.get("/logout", (req, res) => {
  // handle with passport
  res.send("logging out");
});

// auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

// callback route for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.send(`Please be something here :'( ${req.user}`);
  console.log(req.user);
});

module.exports = router;
