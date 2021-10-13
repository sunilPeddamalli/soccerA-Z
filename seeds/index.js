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
            location: 'Barcelona, Spain',
            date: '03-Jun-1991',
            image:'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c29jY2VyJTIwbWF0Y2h8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            team1: 'PSG',
            score1: 2,
            team2: 'Man City',
            score2: 0,
            title: 'Champions League',
            location: 'Paris, France',
            date: '03-Jun-1991',
            image:'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDh8fHNvY2NlciUyMG1hdGNofGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            team1: 'Man City',
            score1: 3,
            team2: 'Man United',
            score2: 1,
            title: 'Premier League',
            location: 'Eithad Stadium, Manchester',
            date: '03-Jun-1991',
            image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c29jY2VyJTIwbWF0Y2h8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
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


