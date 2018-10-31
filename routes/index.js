const express = require("express");

const router = express.Router();

const knex = require("../db/knex");

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/movies", (req, res, next) => {
  knex("movies")
    .select()
    .then(data => {
      res.render("movies", { data });
    });
});

router.post("/movies", (req, res, next) => {
  const url = `http://www.omdbapi.com/?apikey=869369bc&t=${req.body.title}`;
  fetch(url, {
    method: "GET"
  })
    .then(response => response.json())
    .then(myJson => {})
    .then(() => {
      res.redirect("/");
    })
    .catch(err => next(err));
});
// router.post("/movies", db.createMovie);
// router.get("/comments", db.getAllComments);
// router.post("/comments", db.createComment);

module.exports = router;
