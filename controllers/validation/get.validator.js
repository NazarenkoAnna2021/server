const Joi = require('joi');

exports.getValidator = Joi.object().keys({
    name: Joi.string().empty(null).allow(null, ''), 
    id: Joi.number().integer().min(0).empty(null).allow(null, ''),
    page: Joi.number().integer().min(0).empty(null).allow(null, ''),
    prePage: Joi.number().integer().min(0).empty(null).allow(null, '')
  });