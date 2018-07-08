const express = require('express');
const router = express.Router();

const db = require('../queries');


router.get('/movies', db.getAllMovies);
router.post('/movies', db.createMovie);
router.get('/comments', db.getAllComments);
router.post('/comments', db.createComment);


module.exports = router;
