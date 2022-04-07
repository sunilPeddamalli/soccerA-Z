const express = require('express');
const router = express.Router();
const catchError = require('../utils/catchError');
const {isLoggedIn,isAuthor, validateMatch} = require('../middleware.js');
const matches = require('../controllers/matches');
const multer  = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});


router.get('/matches',catchError(matches.index));

router.get('/matches/new', isLoggedIn , matches.renderNewForm);

router.post('/matches',isLoggedIn,upload.array('image'),validateMatch, catchError(matches.createMatch));

router.get('/matches/:id', catchError(matches.showMatch));

router.get('/matches/:id/edit',isLoggedIn,isAuthor, catchError(matches.renderEditForm));

router.put('/matches/:id',isLoggedIn,isAuthor, validateMatch, catchError(matches.editMatch));

router.delete('/matches/:id',isLoggedIn,isAuthor, catchError(matches.deleteMatch));

module.exports = router