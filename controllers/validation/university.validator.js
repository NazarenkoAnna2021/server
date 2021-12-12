const Joi = require('joi');

exports.universityValidator = Joi.object().keys({
    country: Joi.string().alphanum().required(),
    city: Joi.string().alphanum().required(),
    name: Joi.string().alphanum().required(),
    accreditation: Joi.string().alphanum().required(),
});