const { required } = require('joi');

exports.idValidator = require('./id.validator').idValidator;
exports.doubleIdValidator = require('./id.validator').doubleIdValidator;
exports.userValidator = require('./user.validator').userValidator;
exports.getValidator = require('./get.validator').getValidator;
exports.universityValidator = require('./university.validator').universityValidator;
exports.coursesValidator = require('./courses.validator').coursesValidator;
exports.marksValidator = require('./marks.validator').marksValidator;

exports.validate = (data, schema) => {
  const result = schema.validate(data, { abortEarly: false });

  if (result.error) {
    const error = { status: 400, data: result.error.message };
    return { error };
  }
  return { value: result.value };
};
