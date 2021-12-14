const Joi = require('joi');

exports.coursesValidator = Joi.object().keys({
    name: Joi.string().alphanum().required(),
    university_id: Joi.number().integer().min(0).required(),
    teacher_id: Joi.number().integer().min(0).required()
});