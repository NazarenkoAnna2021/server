const Joi = require('joi');

exports.universityValidator = Joi.object().keys({
    country: Joi.string().alphanum().allow(null, ''),
    city: Joi.string().alphanum().allow(null, ''),
    name: Joi.string().alphanum().allow(null, ''),
    accreditation: Joi.string().alphanum().allow(null, ''),
});