const validators = require('./validation');
const marksRepository = require('../database/repositories/marks.repository');

const createNewMark = async (body) => {
  const { value, error } = validators.validate(body, validators.marksValidator);
  if (error) return { error };

  const { error: dbError, result } = await marksRepository.createMark(value);

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { data: result, status: 201 } };
};

module.exports = { createNewMark };