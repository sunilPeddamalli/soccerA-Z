const mongoose = require('mongoose');
const Feedback = require('./feedback');

const matchSchema = new mongoose.Schema({
    team1: String,
    score1: Number,
    team2: String,
    score2: Number,
    goalScorer1: String,
    goalScorer2: String,
    playerOfTheMatch: String,
    date: String,
    images: [
                {
                    url:String,
                    filename:String
                }
            ],
    // Time: String,
    title: String,
    location: String,
    author:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    feedbacks:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Feedback'
            }
        ]
})

matchSchema.post('findOneAndDelete', async function(match){
        if(match){
            await Feedback.deleteMany({_id:{$in: match.feedbacks}})
        }
});

module.exports  = mongoose.model('Match', matchSchema);

