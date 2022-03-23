const flash = require('connect-flash/lib/flash');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const catchError = require('../utils/catchError');

router.get('/register', (req,res)=>{
   res.render('user/register')
});

router.post('/register', catchError(async (req,res,next)=> {
   try{
      const {username, email, password} = req.body;
      const user = new User ({username, email});
      const registeredUser = await User.register(user,password);
      req.logIn(registeredUser, err => {
         if(err) return next(err);
         req.flash('success', 'Welcome')
         res.redirect('/matches')
      });   
   }
   catch(e){
      req.flash('error', 'A user with given username or email-id is already registered');
      res.redirect('/register')
   }
}));

router.get('/login', (req,res)=>{
   res.render('user/login');
})

router.post('/login',passport.authenticate('local',{failureFlash: true, failureRedirect:'/login'}),(req,res)=>{
   req.flash('success','Welcome!!!')
   res.redirect(req.session.returnTo || '/matches');
   delete req.session.returnTo;
   
})

router.get('/logout',(req,res)=> {
   req.logOut();
   req.flash('success', 'logged you out');
   delete req.session.returnTo;
   res.redirect('/matches');
  
})

module.exports = router;