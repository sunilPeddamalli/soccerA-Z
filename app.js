const express = require('express');
const app = express();
const mongoose = require('mongoose');


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

app.listen(3000, ()=>{
    console.log('Listening to port 3000 for soccerA-Z');
})