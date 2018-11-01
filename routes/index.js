const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

const knex = require("../db/knex");

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/movies", (req, res, next) => {
  knex("movies")
    .select()
    .then(movies => {
      res.render("movies", { movies });
    });
});

router.get("/movies/:id", (req, res, next) => {
  const { id } = req.params;
  knex("movies")
    .select()
    .where("id", id)
    .then(movie => {
      res.render("show", { movie });
    });
});

router.post("/movies", (req, res, next) => {
  const url = `http://www.omdbapi.com/?apikey=869369bc&t=${req.body.title}`;
  fetch(url, {
    method: "GET"
  })
    .then(response => response.json())
    .then(myJson => {
      const movie = {
        // TODO load myJson including Ratings object
        Title: myJson.Title,
        Year: myJson.Year,
        Rated: myJson.Rated,
        Released: myJson.Released,
        Runtime: myJson.Runtime,
        Genre: myJson.Genre,
        Director: myJson.Director,
        Writer: myJson.Writer,
        Actors: myJson.Actors,
        Plot: myJson.Plot,
        Language: myJson.Language,
        Country: myJson.Country,
        Awards: myJson.Awards,
        Poster: myJson.Poster,
        Metascore: myJson.Metascore,
        imdbRating: myJson.imdbRating,
        imdbVotes: myJson.imdbVotes,
        imdbID: myJson.imdbID,
        Type: myJson.Type,
        DVD: myJson.DVD,
        BoxOffice: myJson.BoxOffice,
        Production: myJson.Production,
        Website: myJson.Website,
        Response: myJson.Response
      };
      knex("movies")
        .insert(movie)
        .then(() => {
          res.redirect("/movies");
        });
    })
    .catch(err => next(err));
});

module.exports = router;
