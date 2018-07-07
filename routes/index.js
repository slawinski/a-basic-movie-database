var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/movies', db.getAllMovies);
router.get('/movies/:id', db.getSingleMovie);
router.post('/movies', db.createMovie);
router.put('/movies/:id', db.updateMovie);
router.delete('/movies/:id', db.removeMovie);


module.exports = router;
