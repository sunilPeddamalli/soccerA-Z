const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    team1: String,
    score1: Number,
    team2: String,
    score2: Number,
    goalScorer1: String,
    goalScorer2: String,
    playerOfTheMatch: String,
    date: String,
    image: String,
    // Time: String,
    title: String,
    location: String
})

module.exports  = mongoose.model('Match', matchSchema);

