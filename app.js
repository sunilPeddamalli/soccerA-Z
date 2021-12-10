const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Match = require('./models/matches');
const Feedback = require('./models/feedback');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const catchError = require('./utils/catchError');
const expressError = require('./utils/expressError');
const {matchSchema, feedbackSchema}= require('./schemas.js')

mongoose.connect('mongodb://localhost/soccerA-Z')
    .then(()=>{
        console.log('connected to MongoDB for soccerA-Z');
    }).catch(e =>{
        console.log('Mongo Error- soccerA-Z');
        console.log(e);
    });

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, '/public')))

const validateMatch = (req,res,next) => {
    const result= matchSchema.validate(req.body);
    if(result.error){
        throw new expressError(result.error.details[0].message,400);
    } else{
        next();
    }
}

const validateFeedback = (req,res,next) => {
    const result = feedbackSchema.validate(req.body);
    if(result.error){
        throw new expressError(result.error.details[0].message,400);
    } else{
        next();
    }
}

app.get('/',(req,res)=>{
    res.send('Welcome!!!');
})

app.get('/matches',catchError(async(req,res)=>{
    const matches =await Match.find({});
    res.render('matches/index',{matches});
}));

app.get('/matches/new', (req,res) =>{
    res.render('matches/new');
});

app.post('/matches',validateMatch, catchError(async(req,res)=>{
   const match = new Match(req.body.match);
   await match.save();
   res.redirect('/matches')
}));

app.get('/matches/:id', catchError(async(req,res)=>{
    const {id} = req.params;
    const match = await Match.findById(id).populate('feedbacks');
    const goalScorer1 = match.goalScorer1.split(',');
    const goalScorer2 = match.goalScorer2.split(',');
    res.render('matches/show',{match, goalScorer1, goalScorer2});
}));

app.get('/matches/:id/edit', catchError(async (req,res)=>{
    const {id} = req.params;
    const match = await Match.findById(id);
    res.render('matches/edit',{match});
}));

app.put('/matches/:id', validateMatch, catchError(async(req,res,next)=>{
    const {id} = req.params;
    const match = await Match.findByIdAndUpdate(id,req.body.match,{new:true});
    res.redirect(`/matches/${match._id}`);
}));

app.delete('/matches/:id', catchError(async (req,res)=>{
    const {id} = req.params;
    await Match.findByIdAndDelete(id);
    res.redirect('/matches');
}));

app.post('/matches/:id/feedbacks',validateFeedback, catchError(async(req,res)=>{
    const {id} = req.params;
    const match = await Match.findById(id);
    const feedback = new Feedback(req.body.feedback);
    match.feedbacks.push(feedback);
    await match.save()
    await feedback.save();
    res.redirect(`/matches/${match._id}`);
}));

app.delete('/matches/:id/feedbacks/:feedbackId', catchError(async(req,res)=>{
    const {id, feedbackId} = req.params;
    await Match.findByIdAndUpdate(id,{$pull: {feedbacks:feedbackId}})
    await Feedback.findByIdAndDelete(feedbackId);
    res.redirect(`/matches/${id}`);
}));

app.use('*', (req,res)=>{
    throw new expressError('Page not found!', 404)
});

app.use((err,req,res,next)=>{
    const {statusCode= 500} = err
    if(!err.message) err.message = 'Something went wrong';
    res.status(statusCode).render('error.ejs',{err})
});

app.listen(3000, ()=>{
    console.log('Listening to port 3000 for soccerA-Z');
});