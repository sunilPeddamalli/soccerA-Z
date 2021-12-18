const express = require('express');
const router = express.Router();
const {feedbackSchema}= require('../schemas.js');
const expressError = require('../utils/expressError');
const catchError = require('../utils/catchError');
const Match = require('../models/matches');
const Feedback = require('../models/feedback');


const validateFeedback = (req,res,next) => {
    const result = feedbackSchema.validate(req.body);
    if(result.error){
        throw new expressError(result.error.details[0].message,400);
    } else{
        next();
    }
}

router.post('/matches/:id/feedbacks',validateFeedback, catchError(async(req,res)=>{
    const {id} = req.params;
    const match = await Match.findById(id);
    const feedback = new Feedback(req.body.feedback);
    match.feedbacks.push(feedback);
    await match.save()
    await feedback.save();
    res.redirect(`/matches/${match._id}`);
}));

router.delete('/matches/:id/feedbacks/:feedbackId', catchError(async(req,res)=>{
    const {id, feedbackId} = req.params;
    await Match.findByIdAndUpdate(id,{$pull: {feedbacks:feedbackId}})
    await Feedback.findByIdAndDelete(feedbackId);
    res.redirect(`/matches/${id}`);
}));

module.exports = router;