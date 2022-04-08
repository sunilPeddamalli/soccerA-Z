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
            goalScorer1: 'Roshan 2,Maddy 1',
            goalScorer2: '',
            playerOfTheMatch: 'Roshan',
            title: 'LaLiga',
            location: 'Barcelona, Spain',
            date: '03-Jun-1991',
            author: '623552f7f14565e603760b7c',
            images: [
                {
                  url: 'https://res.cloudinary.com/dgwjefrjq/image/upload/v1649376944/SoccerA-Z/vxr4e38fcizoysubvrxq.jpg',
                  filename: 'SoccerA-Z/vxr4e38fcizoysubvrxq',
                }
              ]
        },
        {
            team1: 'PSG',
            score1: 2,
            team2: 'Man City',
            score2: 0,
            goalScorer1: 'Solo 2',
            goalScorer2: '',
            playerOfTheMatch: 'Solo',
            title: 'Champions League',
            location: 'Paris, France',
            date: '03-Jun-1991',
            author: '623552f7f14565e603760b7c',
            images: [
                {
                  url: 'https://res.cloudinary.com/dgwjefrjq/image/upload/v1649376944/SoccerA-Z/vxr4e38fcizoysubvrxq.jpg',
                  filename: 'SoccerA-Z/vxr4e38fcizoysubvrxq',
                }
              ]
        },
        {
            team1: 'Man City',
            score1: 3,
            team2: 'Man United',
            score2: 1,
            goalScorer1: 'Toto 3',
            goalScorer2: 'Sunil 1',
            playerOfTheMatch: 'Toto',
            title: 'Premier League',
            location: 'Eithad Stadium, Manchester',
            date: '03-Jun-1991',
            author: '623552f7f14565e603760b7c',
            images: [
                {
                  url: 'https://res.cloudinary.com/dgwjefrjq/image/upload/v1649376944/SoccerA-Z/vxr4e38fcizoysubvrxq.jpg',
                  filename: 'SoccerA-Z/vxr4e38fcizoysubvrxq',
                }
              ]
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


