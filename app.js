const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const expressError = require('./utils/expressError');
const matches = require('./routes/matches.js')
const feedbacks = require('./routes/feedbacks.js')
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const passportLocal = require('passport-local');
const User = require('./models/user');

// moved to seperate route folder
// const Match = require('./models/matches');
// const Feedback = require('./models/feedback');
// const catchError = require('./utils/catchError');
// const {matchSchema, feedbackSchema}= require('./schemas.js');

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
app.use(express.static(path.join(__dirname, '/public')));

const sessionConfig = {
    secret:'thisisasecret',
    resave: false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires: Date.now()+1000*60*60*24*7,
        maxAge: 1000*60*60*24*7
    }
}

app.use(session(sessionConfig));
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next()
}) 

app.get('/',(req,res)=>{
    res.send('Welcome!!!');
})

app.use('/',matches);

app.use('/',feedbacks);

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