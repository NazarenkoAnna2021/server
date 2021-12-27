const Joi = require('joi');

exports.coursesValidator = Joi.object().keys({
    name: Joi.string().alphanum().required(),
    teachers_id: Joi.number().integer().min(0).required()
});