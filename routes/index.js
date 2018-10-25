const express = require("express");

const router = express.Router();

const knex = require("../db/knex");

router.get("/movies", (req, res, next) => {
  knex("movies")
    .select()
    .then(data => {
      res.render("movies", data);
    });
});
// router.post("/movies", db.createMovie);
// router.get("/comments", db.getAllComments);
// router.post("/comments", db.createComment);

module.exports = router;
