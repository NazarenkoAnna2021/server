const Joi = require('joi');

exports.marksValidator = Joi.object().keys({
    mark: Joi.number().integer().min(0).required(),
    student_id: Joi.number().integer().min(0).required(),
    course_id: Joi.number().integer().min(0).required(),
    university_id: Joi.number().integer().min(0).required(),
});