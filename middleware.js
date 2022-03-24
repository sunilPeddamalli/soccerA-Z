const Match = require('./models/matches');
const expressError = require('./utils/expressError');
const {matchSchema, feedbackSchema}= require('./schemas.js');
const Feedback = require('./models/feedback');

module.exports.isLoggedIn = (req,res,next)=>{
   if(!req.isAuthenticated()){
      req.session.returnTo = req.originalUrl
      req.flash('error','Login required. New user need to first register')
      res.redirect('/login')
   } else {
      next();
   }
}

module.exports.isAuthor = async(req, res, next) => {
   const {id} = req.params;
   const match = await Match.findById(id);
   if(!match.author.equals(req.user._id)){
       req.flash('error', "You don't have the permission");
       return res.redirect(`/matches/${match._id}`);        
   }
   next();
}

module.exports.isFeedbackAuthor = async (req,res,next) => {
   const {id, feedbackId} = req.params;
   const match = await Match.findById(id);
   const feedback = await Feedback.findById(feedbackId);
   if(!(feedback.author.equals(req.user._id) || req.user.username === 'Toto')){
       req.flash('error', "You don't have the permission");
       return res.redirect(`/matches/${match._id}`);     
   }
   next()
}

module.exports.validateMatch = (req,res,next) => {
   const result= matchSchema.validate(req.body);
   if(result.error){
       throw new expressError(result.error.details[0].message,400);
   } else{
       next();
   }
};

module.exports.validateFeedback = (req,res,next) => {
   const result = feedbackSchema.validate(req.body);
   if(result.error){
       throw new expressError(result.error.details[0].message,400);
   } else{
       next();
   }
}

