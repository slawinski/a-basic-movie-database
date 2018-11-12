const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

const knex = require("../db/knex");

router.get("/", (req, res, next) => {
  knex("movies")
    .select()
    .orderBy("created_at", "desc")
    .then(movies => {
      res.render("movies", { movies });
    });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  knex("movies")
    .select()
    .where("id", id)
    .then(movie => {
      knex("comments")
        .select(
          "id",
          "movie_id",
          "comment",
          knex.raw(`to_char("created_at", 'YYYY-MM-DD HH:mm') as "created_at"`)
        )
        .where("movie_id", id)
        .then(comments => {
          res.render("show", { movie, comments });
        });
    });
});

router.get("/:movie_id/comment/:comment_id/edit", (req, res, next) => {
  const commentId = req.params.comment_id;
  knex("comments")
    .select(
      "id",
      "movie_id",
      "comment",
      knex.raw(`to_char("created_at", 'YYYY-MM-DD HH:mm') as "created_at"`)
    )
    .where("id", commentId)
    .then(comment => {
      res.render("edit", { comment });
    });
});

router.post("/", (req, res, next) => {
  const url = `http://www.omdbapi.com/?apikey=869369bc&t=${req.body.title}`;
  fetch(url, {
    method: "GET"
  })
    .then(response => response.json())
    .then(myJson => {
      if (typeof myJson.Title === "string" && myJson.Title.trim() !== "") {
        const movie = {
          // TODO load myJson including Ratings object
          title: myJson.Title,
          year: myJson.Year,
          rated: myJson.Rated,
          released: myJson.Released,
          runtime: myJson.Runtime,
          genre: myJson.Genre,
          director: myJson.Director,
          writer: myJson.Writer,
          actors: myJson.Actors,
          plot: myJson.Plot,
          language: myJson.Language,
          country: myJson.Country,
          awards: myJson.Awards,
          poster: myJson.Poster,
          metascore: myJson.Metascore,
          imdbRating: myJson.imdbRating,
          imdbVotes: myJson.imdbVotes,
          imdbID: myJson.imdbID,
          type: myJson.Type,
          DVD: myJson.DVD,
          boxOffice: myJson.BoxOffice,
          production: myJson.Production,
          website: myJson.Website,
          response: myJson.Response
        };
        knex("movies")
          .insert(movie)
          .then(() => {
            res.redirect("/");
          });
      } else {
        res.status(500);
        res.render("error", { message: "Title not found" });
      }
    })
    .catch(err => next(err));
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  knex("comments")
    .where("movie_id", id)
    .del()
    .then(() => {
      knex("movies")
        .where("id", id)
        .del()
        .then(() => {
          res.redirect("/");
        });
    });
});

router.delete("/:movie_id/comment/:comment_id", (req, res, next) => {
  const commentId = req.params.comment_id;
  const movieId = req.params.movie_id;
  knex("comments")
    .where("id", commentId)
    .del()
    .then(() => {
      res.redirect(`/${movieId}`);
    });
});

router.post("/:id", (req, res, next) => {
  const comments = {
    movie_id: req.params.id,
    comment: req.body.comment
  };
  knex("comments")
    .insert(comments)
    .then(() => {
      res.redirect(`/${req.params.id}`);
    });
});

router.put("/:movie_id/comment/:comment_id", (req, res, next) => {
  knex("comments")
    .where("id", req.params.comment_id)
    .update("comment", req.body.comment)
    .then(() => {
      res.redirect(`/${req.params.movie_id}`);
    });
});

module.exports = router;
