const validators = require('./validation');
const userRepository = require('../database/repositories/user.repository');

const getTeacher = async (query) => {
  // const { value, error } = validators.validate(query, validators.idValidator);
  // if (error) return { error };
  console.log(query);
  const { error: dbError, result } = await userRepository.getUserByUniversityId(query, 'teacher');

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { data: result, status: 200 } };
};

const getStudent = async (query) => {
  /* const { value, error } = validators.validate(query, validators.idValidator);
  if (error) return { error }; */

  const { error: dbError, result } = await userRepository.getUserByUniversityId(query, 'student');

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { data: result, status: 200 } };
};

const getAllUsers = async ({ page, perPage, name, role }) => {
  console.log(page, perPage, name, role);
  const { error: dbError, result } = await userRepository.getUsers({ page, perPage, name, role });

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { data: result, status: 200 } };
};

const createNewStudent = async (body) => {
  const { value, error } = validators.validate(body, validators.userValidator);
  if (error) return { error };


  const { error: dbError } = await userRepository.createUser('student', value.name, value.age, value.university_id);

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { data: { created: 1 }, status: 201 } };
};

const createNewTeacher = async (body) => {
  const { value, error } = validators.validate(body, validators.userValidator);
  if (error) return { error };


  const { error: dbError } = await userRepository.createUser('teacher', value.name, value.age, value.university_id);

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { data: { created: 1 }, status: 201 } };
};

const updateUser = async (body, query) => {
  const { value, error } = validators.validate(query, validators.idValidator);
  if (error) return { error };

  const changes = Object.entries(body);

  const { error: dbError, result } = await userRepository.updateUserById(changes, value.id);

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { data: result, status: 200 } };
};

const deleteUser = async (query) => {
  const { value, error } = validators.validate(query, validators.idValidator);
  if (error) return { error };

  const { error: dbError } = await userRepository.deleteUserById(value.id);

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { deleted: 1, status: 200 } };
};

module.exports = { getTeacher, getStudent, getAllUsers, createNewTeacher, createNewStudent, updateUser, deleteUser };
