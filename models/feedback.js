const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    body: String,
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('Feedback', feedbackSchema);

