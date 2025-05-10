const Joi = require('joi');   //joi req for valid schema an  joi is a npm package
const listing = require('./models/listing');
const review = require('./models/review');

module.exports.listingSchema = Joi.object({
    listing : Joi.object({    //required:listing obj hmsa jb v request aye hmlog pass uski ander listing naamka obj hona chiye
       
        title: Joi.string().required(),
       description: Joi.string().required(),
       location: Joi.string().required(),
       country: Joi.string().required(),
       price: Joi.number().required().min(0),
       image: Joi.string().allow("",null),


    }).required()
});


// review schema
module.exports.reviewSchema = Joi.object({
    review:  Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required(),
});

