const express = require('express');
const router = express.Router();
const catchError = require('../utils/catchError');
const Match = require('../models/matches');
const expressError = require('../utils/expressError');
const {matchSchema}= require('../schemas.js');
const {isLoggedIn,validateMatch} = require('../middleware.js');
const flash = require('connect-flash/lib/flash');



router.get('/matches',catchError(async(req,res)=>{
    const matches =await Match.find({});
    res.render('matches/index',{matches});
}));

router.get('/matches/new', isLoggedIn ,(req,res) =>{
    if(req.user.username === 'Toto') return res.render('matches/new');
    req.flash('error', "You don't have the permission");
    res.redirect('/matches')
});

router.post('/matches',isLoggedIn,validateMatch, catchError(async(req,res)=>{
    if(req.user.username === 'Toto'){
   const match = new Match(req.body.match);
   match.author = req.user._id;
   await match.save();
   req.flash('success','Successfully created match')
   res.redirect(`/matches/${match._id}`)
    } else {
    req.flash('error', "You don't have the permission");
    res.redirect('/matches')
    }
}));

router.get('/matches/:id', catchError(async(req,res)=>{
    const {id} = req.params;
    const match = await Match.findById(id).populate('feedbacks').populate('author');
    if(!match){
        req.flash('error','Match not found');
        return res.redirect('/matches')
    }
    const goalScorer1 = match.goalScorer1.split(',');
    const goalScorer2 = match.goalScorer2.split(',');
    res.render('matches/show',{match, goalScorer1, goalScorer2});
}));

router.get('/matches/:id/edit',isLoggedIn, catchError(async (req,res)=>{
    const {id} = req.params;
    const match = await Match.findById(id);
    if(!match){
        req.flash('error','Match not found');
        return res.redirect('/matches')
    }
    res.render('matches/edit',{match});
}));

router.put('/matches/:id',isLoggedIn, validateMatch, catchError(async(req,res,next)=>{
    const {id} = req.params;
    const match = await Match.findByIdAndUpdate(id,req.body.match,{new:true});
    req.flash('success','Successfully updated match')
    res.redirect(`/matches/${match._id}`);
}));

router.delete('/matches/:id',isLoggedIn, catchError(async (req,res)=>{
    const {id} = req.params;
    await Match.findByIdAndDelete(id);
    req.flash('success','Successfully deleted match')
    res.redirect('/matches');
}));

module.exports = router