const Joi = require('joi');

exports.userValidator = Joi.object().keys({
  name: Joi.string().allow(null, ''), 
  age: Joi.number().integer().min(0).allow(null, ''), 
  university_id: Joi.number().integer().min(0).allow(null, ''),
});

exports.userGetValidator = Joi.object().keys({
  name: Joi.string().empty(null).allow(null, ''), 
  id: Joi.number().integer().min(0).empty(null).allow(null, ''),
  page: Joi.number().integer().min(0).empty(null).allow(null, ''),
  prePage: Joi.number().integer().min(0).empty(null).allow(null, '')
});