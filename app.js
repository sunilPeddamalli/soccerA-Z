const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Match = require('./models/matches');

mongoose.connect('mongodb://localhost/soccerA-Z')
    .then(()=>{
        console.log('connected to MongoDB for soccerA-Z');
    }).catch(e =>{
        console.log('Mongo Error- soccerA-Z');
        console.log(e);
    })

app.get('/',(req,res)=>{
    res.send('Welcome!!!');
})

app.get('/matches',async(req,res)=>{
    const matches =await Match.find({});
    res.send(matches);
    console.log(matches);
});

app.listen(3000, ()=>{
    console.log('Listening to port 3000 for soccerA-Z');
})