const express = require('express');
const router = express.Router();

const db = require('../queries');


router.get('/movies', db.getAllMovies);
router.get('/movies/:id', db.getSingleMovie);
router.post('/movies', db.createMovie);
router.put('/movies/:id', db.updateMovie);
router.delete('/movies/:id', db.removeMovie);


module.exports = router;
