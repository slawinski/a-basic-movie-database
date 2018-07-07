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
  getSingleMovie: getSingleMovie,
  createMovie: createMovie,
  updateMovie: updateMovie,
  removeMovie: removeMovie
};

function getAllMovies(req, res, next) {
  db.any('select * from movies')
      .then(function (data) {
        res.render('index', {
          data: data,
        });
      })
      .catch(function (err) {
        return next(err);
      });
}

function getSingleMovie(req, res, next) {
  const movieID = parseInt(req.params.id);
  db.one('select * from movies where id = $1', movieID)
      .then(function (data) {
        res.status(200)
            .json({
              status: 'success',
              data: data,
              message: 'Retrieved ONE movie'
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

function updateMovie(req, res, next) {
  db.none('update movies set title=$1, genre=$2 year=$3, director=$4, country=$5, boxoffice=&6 where id=$7',
      [req.body.title, parseInt(req.body.year), req.body.director,
        req.body.country, parseInt(req.params.id)])
      .then(function () {
        res.status(200)
            .json({
              status: 'success',
              message: 'Updated movie'
            });
      })
      .catch(function (err) {
        return next(err);
      });
}

function removeMovie(req, res, next) {
  const movieID = parseInt(req.params.id);
  db.result('delete from movies where id = $1', movieID)
      .then(function (result) {
        /* jshint ignore:start */
        res.status(200)
            .json({
              status: 'success',
              message: `Removed ${result.rowCount} movie`
            });
        /* jshint ignore:end */
      })
      .catch(function (err) {
        return next(err);
      });
}
