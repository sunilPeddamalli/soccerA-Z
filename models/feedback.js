const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    body: String
});

module.exports = mongoose.model('Feedback', feedbackSchema);

