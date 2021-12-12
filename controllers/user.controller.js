const validators = require('./validation');
const userRepository = require('../database/repositories/user.repository');

const getSingleUser = async (query) => {
  const { value, error } = validators.validate(query, validators.idValidator);
  if (error) return { error };

  const { error: dbError, result } = await userRepository.getUserById(value.id);

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { data: result, status: 200 } };
};

const getAllUsers = async () => {
  const { error: dbError, result } = await userRepository.getUsers();

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { data: result, status: 200 } };
};

const createUser = async (body) => {
  const { value, error } = validators.validate(body, validators.userValidator);
  if (error) return { error };

  const { error: dbError } = await userRepository.createUser(value.role, value.name, value.age, value.university_id);

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

  const { error: dbError, result } = await userRepository.deleteUserById(value.id);

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { deleted: 1, status: 200 } };
};

module.exports = { getSingleUser, getAllUsers, createUser, updateUser, deleteUser };
