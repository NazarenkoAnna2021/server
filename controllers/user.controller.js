const validators = require('./validation');
const userRepository = require('../database/repositories/user.repository');

exports.createNewTeacher = async (body) => {
  const { value, error } = validators.validate(body, validators.userValidator);
  if (error) return { error };

  const { error: dbError } = await userRepository.createUser('teacher', value.name, value.age, value.university_id);

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { data: { created: 1 }, status: 201 } };
};
