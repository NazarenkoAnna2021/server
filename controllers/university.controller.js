const validators = require('./validation');
const universityRepository = require('../database/repositories/university.repository');

const createNewUniversity = async (body) => {
  const { value, error } = validators.validate(body, validators.universityValidator);
  if (error) return { error };

  const { error: dbError } = await universityRepository.createUniversity(value.country, value.city, value.name, value.accreditation);

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { data: { created: 1 }, status: 201 } };
};

const getSingleUniversity = async (query) => {
  const { value, error } = validators.validate(query, validators.idValidator);
  if (error) return { error };

  const { error: dbError, result } = await universityRepository.getUniversityById(value.id);

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { data: result, status: 200 } };
};


const getAllUniversities = async (query) => {
  const { error: dbError, result } = await universityRepository.getUniversities(query);

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { data: result, status: 200 } };
};

const updateUniversity = async (body, query) => {
  const { value, error } = validators.validate(query, validators.idValidator);
  if (error) return { error };

  const changes = Object.entries(body);

  const { error: dbError, result } = await universityRepository.updateUniversityById(changes, value.id);

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { data: result, status: 200 } };
};

const deleteUniversity = async (query) => {
  const { value, error } = validators.validate(query, validators.idValidator);
  if (error) return { error };

  const { error: dbError } = await universityRepository.deleteUniversityById(value.id);

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { deleted: 1, status: 200 } };
};

module.exports = { createNewUniversity, getSingleUniversity, getAllUniversities, updateUniversity, deleteUniversity };