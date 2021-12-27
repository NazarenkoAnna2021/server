const Joi = require('joi');

exports.idValidator = Joi.object().keys({
  id: Joi.number().integer().min(0).required(),
});

exports.doubleIdValidator = Joi.object().keys({
  students_id: Joi.number().integer().min(0).required(),
  courses_id: Joi.number().integer().min(0).required(),
});