const Joi = require('joi');

exports.userValidator = Joi.object().keys({
  role: Joi.string().alphanum().required(), 
  name: Joi.string().alphanum().required(), 
  age: Joi.number().integer().min(0).required(), 
  university_id: Joi.number().integer().min(0).required()
});