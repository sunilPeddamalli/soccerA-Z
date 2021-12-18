const express = require('express');
const router = express.Router();
const catchError = require('../utils/catchError');
const Match = require('../models/matches');
const expressError = require('../utils/expressError');
const {matchSchema}= require('../schemas.js');

const validateMatch = (req,res,next) => {
    const result= matchSchema.validate(req.body);
    if(result.error){
        throw new expressError(result.error.details[0].message,400);
    } else{
        next();
    }
};

router.get('/matches',catchError(async(req,res)=>{
    const matches =await Match.find({});
    res.render('matches/index',{matches});
}));

router.get('/matches/new', (req,res) =>{
    res.render('matches/new');
});

router.post('/matches',validateMatch, catchError(async(req,res)=>{
   const match = new Match(req.body.match);
   await match.save();
   res.redirect(`/matches/${match._id}`)
}));

router.get('/matches/:id', catchError(async(req,res)=>{
    const {id} = req.params;
    const match = await Match.findById(id).populate('feedbacks');
    const goalScorer1 = match.goalScorer1.split(',');
    const goalScorer2 = match.goalScorer2.split(',');
    res.render('matches/show',{match, goalScorer1, goalScorer2});
}));

router.get('/matches/:id/edit', catchError(async (req,res)=>{
    const {id} = req.params;
    const match = await Match.findById(id);
    res.render('matches/edit',{match});
}));

router.put('/matches/:id', validateMatch, catchError(async(req,res,next)=>{
    const {id} = req.params;
    const match = await Match.findByIdAndUpdate(id,req.body.match,{new:true});
    res.redirect(`/matches/${match._id}`);
}));

router.delete('/matches/:id', catchError(async (req,res)=>{
    const {id} = req.params;
    await Match.findByIdAndDelete(id);
    res.redirect('/matches');
}));

module.exports = router