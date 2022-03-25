const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchError = require('../utils/catchError');
const users = require('../controllers/user')

router.get('/register',users.renderRegisterForm);

router.post('/register', catchError(users.registerUser));

router.get('/login', users.renderLoginForm)

router.post('/login',passport.authenticate('local',{failureFlash: true, failureRedirect:'/login'}), users.loginUser)

router.get('/logout', users.logout)

module.exports = router;