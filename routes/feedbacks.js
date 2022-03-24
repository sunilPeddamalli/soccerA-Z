const express = require('express');
const router = express.Router();
const catchError = require('../utils/catchError');
const Match = require('../models/matches');
const Feedback = require('../models/feedback');
const {isLoggedIn,validateFeedback,isFeedbackAuthor} = require('../middleware.js')


router.post('/matches/:id/feedbacks',isLoggedIn, validateFeedback, catchError(async(req,res)=>{
    const {id} = req.params;
    const match = await Match.findById(id);
    const feedback = new Feedback(req.body.feedback);
    feedback.author = req.user._id;
    match.feedbacks.push(feedback);
    await match.save()
    await feedback.save();
    req.flash('success','Successfully created feedback')
    res.redirect(`/matches/${match._id}`);
}));

router.delete('/matches/:id/feedbacks/:feedbackId',isLoggedIn,isFeedbackAuthor, catchError(async(req,res)=>{
    const {id, feedbackId} = req.params;
    await Match.findByIdAndUpdate(id,{$pull: {feedbacks:feedbackId}})
    await Feedback.findByIdAndDelete(feedbackId);
    req.flash('success','Successfully deleted feedback')
    res.redirect(`/matches/${id}`);
}));

module.exports = router;