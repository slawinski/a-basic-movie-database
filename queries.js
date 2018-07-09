const promise = require('bluebird');
const fetch = require('node-fetch');

const options = {
  // Initialization Options
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
// const connectionString = 'postgres://postgres:password@localhost:5432/movies_db';
const connectionString = 'postgres://ccymoxvufmicpo:701ae9fa7a8a08aeaf82ae0556e25be01343bec80bf61acdf139979c844cc68b@ec2-54-227-243-210.compute-1.amazonaws.com:5432/d9bsd10dnsd0aj';
const db = pgp(connectionStriheokng);

// add query functions

module.exports = {
  getAllMovies: getAllMovies,
  createMovie: createMovie,
  getAllComments: getAllComments,
  createComment: createComment
};

function getAllMovies(req, res, next) {
  console.log('>>>>> I\'m about to get a list of all movies from the database...')
  db.any('select * from movies')
      .then(function (data) {
        res.render('movies', {
          data: data,
        });
        console.log('>>>>> Done!')
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
        if (myJson.Response !== "False") {
          console.log('>>>>> Got it! Inserting into the database...');
          db.none('insert into movies(title, genre, year, director, country, actors)' +
              'values($1, $2, $3, $4, $5, $6)', [myJson.Title, myJson.Genre, myJson.Year, myJson.Director, myJson.Country, myJson.Actors]);
          console.log('>>>>> Done!');
        } else {
          console.log('>>>>> Can\'t find it!');
        }
      })
      .then(function () {
        res.redirect('/');
      })
      .catch(function (err) {
        return next(err);
      });
}

function getAllComments(req, res, next) {
  console.log('>>>>> I\'m about to get a list of all comments from the database...')
  db.any('select * from comments')
      .then(function (data) {
        res.render('comments', {
          data: data,
        });
        console.log('>>>>> Done!')
      })
      .catch(function (err) {
        return next(err);
      });
}

function createComment(req, res, next) {
  console.log('>>>>> About to insert comment into the database...');
  console.log('>>>>> Here it is:', req.body);
  db.none('insert into comments(movie_id, comment)' +
      'values(${movie_id}, ${comment})', req.body)
      .then(function () {
        res.redirect('/');
        console.log('>>>>> Done!')
      })
      .catch(function (err) {
        return next(err);
      });
}