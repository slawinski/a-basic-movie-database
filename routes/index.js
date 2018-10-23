const express = require("express");

const router = express.Router();

const knex = require("../db/knex");

router.get("/movies", (req, res, next) => {
  knex("movie")
    .select()
    .then(movies => {
      res.render("movies", movies);
    });
});
// router.post("/movies", db.createMovie);
// router.get("/comments", db.getAllComments);
// router.post("/comments", db.createComment);

module.exports = router;
