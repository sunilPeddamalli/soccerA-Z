const express = require('express');
const router = express.Router();
const catchError = require('../utils/catchError');
const {isLoggedIn,validateFeedback,isFeedbackAuthor} = require('../middleware.js')
const feedbacks = require('../controllers/feedback')

router.post('/matches/:id/feedbacks',isLoggedIn, validateFeedback, catchError(feedbacks.createFeedback));

router.delete('/matches/:id/feedbacks/:feedbackId',isLoggedIn,isFeedbackAuthor, catchError(feedbacks.deleteFeedback));

module.exports = router;