const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const expressError = require('./utils/expressError');
const matches = require('./routes/matches.js')
const feedbacks = require('./routes/feedbacks.js')

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
app.use(express.static(path.join(__dirname, '/public')))

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