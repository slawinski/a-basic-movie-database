const promise = require('bluebird');
const fetch = require('node-fetch');

const options = {
  // Initialization Options
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://postgres:password@localhost:5432/movies_db';
const db = pgp(connectionString);

// add query functions

module.exports = {
  getAllMovies: getAllMovies,
  createMovie: createMovie,
  getAllComments: getAllComments,
  createComment: createComment
};

function getAllMovies(req, res, next) {
  db.any('select * from movies')
      .then(function (data) {
        res.render('movies', {
          data: data,
        });
      })
      .catch(function (err) {
        return next(err);
      });
}

function createMovie(req, res, next) {
  let url = ('http://www.omdbapi.com/?apikey=869369bc&t=' + req.body.title);
  console.log('>>>>> Hi, I\'m fetching data from', url);
  fetch(url, {
    method: 'GET',
  })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log('>>>>> Got it! Inserting into the database...');
        db.none('insert into movies(title, genre, year, director, country, actors)' +
            'values($1, $2, $3, $4, $5, $6)', [myJson.Title, myJson.Genre, myJson.Year, myJson.Director, myJson.Country, myJson.Actors]);
      })
      .then(function () {
        res.redirect('/');
      })
      .catch(function (err) {
        return next(err);
      });
}

function getAllComments(req, res, next) {
  db.any('select * from comments')
      .then(function (data) {
        res.render('comments', {
          data: data,
        });
      })
      .catch(function (err) {
        return next(err);
      });
}

function createComment(req, res, next) {
  console.log('>>>>> About to insert comment into the database');
  console.log('>>>>> Here it is:', req.body);
  db.none('insert into comments(movie_id, comment)'  +
      'values(${movie_id}, ${comment})', req.body)
      .then(function () {
        res.redirect('/');
      })
      .catch(function (err) {
        return next(err);
      });
}