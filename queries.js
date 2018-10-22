const promise = require("bluebird");
const fetch = require("node-fetch");

const options = {
  // Initialization Options
  promiseLib: promise
};

const pgp = require("pg-promise")(options);
// const connectionString = 'postgres://postgres:password@localhost:5432/movies_db';
const connectionString =
  "postgres://ccymoxvufmicpo:701ae9fa7a8a08aeaf82ae0556e25be01343bec80bf61acdf139979c844cc68b@ec2-54-227-243-210.compute-1.amazonaws.com:5432/d9bsd10dnsd0aj";
const db = pgp(connectionString);

// add query functions

module.exports = {
  getAllMovies,
  createMovie,
  getAllComments,
  createComment
};

function getAllMovies(req, res, next) {
  db.any("select * from movies")
    .then(data => {
      res.render("movies", {
        data
      });
    })
    .catch(err => next(err));
}

function createMovie(req, res, next) {
  const url = `http://www.omdbapi.com/?apikey=869369bc&t=${req.body.title}`;
  fetch(url, {
    method: "GET"
  })
    .then(response => response.json())
    .then(myJson => {
      if (myJson.Response !== "False") {
        console.log(">>>>> Got it! Inserting into the database...");
        db.none(
          "insert into movies(title, genre, year, director, country, actors)" +
            "values($1, $2, $3, $4, $5, $6)",
          [
            myJson.Title,
            myJson.Genre,
            myJson.Year,
            myJson.Director,
            myJson.Country,
            myJson.Actors
          ]
        );
      } else {
        console.log(">>>>> Can't find it!");
      }
    })
    .then(() => {
      res.redirect("/");
    })
    .catch(err => next(err));
}

function getAllComments(req, res, next) {
  db.any("select * from comments")
    .then(data => {
      res.render("comments", {
        data
      });
    })
    .catch(err => next(err));
}

function createComment(req, res, next) {
  db.none(
    "insert into comments(movie_id, comment)" +
      "values(${movie_id}, ${comment})",
    req.body
  )
    .then(() => {
      res.redirect("/");
      console.log(">>>>> Done!");
    })
    .catch(err => next(err));
}
