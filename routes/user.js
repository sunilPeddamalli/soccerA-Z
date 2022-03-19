const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

router.get('/register', (req,res)=>{
   res.render('user/register')
})

router.post('/register', (req,res)=> {
   res.send(req.body);
})

module.exports = router;