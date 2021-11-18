const Joi = require('joi');

    module.exports.matchSchema = Joi.object({
        match: Joi.object({
         team1:Joi.string().required(),
         score1:Joi.number().required().min(0),
         team2:Joi.string().required(),
         score2:Joi.number().required().min(0),
         goalScorer1: Joi.string().allow(''),
         goalScorer2: Joi.string().allow(''),
         playerOfTheMatch: Joi.string().required(),
         title: Joi.string().required(),
         date:Joi.string().required(),
         location: Joi.string().required(),
         image:Joi.string().allow('')
        }).required()
    })
 