const mongoose = require('mongoose');
const Match = require('../models/matches');

mongoose.connect('mongodb://localhost/soccerA-Z')
    .then(()=>{
        console.log('connected to MongoDB for soccerA-Z');
    }).catch(e =>{
        console.log('Mongo Error- soccerA-Z');
        console.log(e);
    });

    const seedData = [
        {
            team1: 'Barcelona',
            score1: 3,
            team2: 'Real Madrid',
            score2: 0,
            title: 'LaLiga',
            location: 'Barcelona, Spain'
        },
        {
            team1: 'PSG',
            score1: 2,
            team2: 'Man City',
            score2: 0,
            title: 'Champions League',
            location: 'Paris, France'
        },
        {
            team1: 'Man City',
            score1: 3,
            team2: 'Man United',
            score2: 1,
            title: 'Premier League',
            location: 'Eithad Stadium, Manchester'
        }
    ];

const seed = async() =>{
    await Match.deleteMany({})
    await Match.insertMany(seedData)
        .then(data => {
            console.log(data)
        });
};

seed().then(() => {
    mongoose.connection.close();
});


