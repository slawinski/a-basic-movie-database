var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:password@localhost:5432/movies_db';
var db = pgp(connectionString);

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
        res.status(200)
            .json({
              status: 'success',
              data: data,
              message: 'Retrieved ALL movies'
            });
      })
      .catch(function (err) {
        return next(err);
      });
}

function getSingleMovie(req, res, next) {
  var movieID = parseInt(req.params.id);
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
  req.body.year = parseInt(req.body.year);
  db.none('insert into movies(title, year, director, country)' +
      'values(${title}, ${year}, ${director}, ${country})',
      req.body)
      .then(function () {
        res.status(200)
            .json({
              status: 'success',
              message: 'Inserted one movie'
            });
      })
      .catch(function (err) {
        return next(err);
      });
}

function updateMovie(req, res, next) {
  db.none('update movies set title=$1, year=$2, director=$3, country=$4 where id=$5',
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
  var movieID = parseInt(req.params.id);
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
