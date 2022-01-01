const Joi = require('joi');

exports.userValidator = Joi.object().keys({
  name: Joi.string().allow(null, ''), 
  age: Joi.number().integer().min(0).allow(null, ''), 
  university_id: Joi.number().integer().min(0).allow(null, ''),
});