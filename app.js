const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Match = require('./models/matches');
const path = require('path');
const methodOverride = require('method-override');

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

app.get('/',(req,res)=>{
    res.send('Welcome!!!');
})

app.get('/matches',async(req,res)=>{
    const matches =await Match.find({});
    res.render('matches/index',{matches});
});

app.get('/matches/new', (req,res) =>{
    res.render('matches/new');
});

app.post('/matches', async(req,res)=>{
   const match = new Match(req.body.match);
   await match.save();
   res.redirect('/matches')
});

app.get('/matches/:id', async(req,res)=>{
    const {id} = req.params;
    const match = await Match.findById(id);
    res.render('matches/show',{match});
});

app.get('/matches/:id/edit', async (req,res)=>{
    const {id} = req.params;
    const match = await Match.findById(id);
    res.render('matches/edit',{match});
});

app.put('/matches/:id', async(req,res)=>{
    const {id} = req.params;
    const match = await Match.findByIdAndUpdate(id,req.body.match,{new:true});
    res.redirect(`/matches/${match._id}`);
});

app.delete('/matches/:id', async (req,res)=>{
    const {id} = req.params;
    await Match.findByIdAndDelete(id);
    res.redirect('/matches');
})

app.listen(3000, ()=>{
    console.log('Listening to port 3000 for soccerA-Z');
})