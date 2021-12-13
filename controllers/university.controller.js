const validators = require('./validation');
const universityRepository = require('../database/repositories/university.repository');

const getSingleUniversity = async (query) => {
  const { value, error } = validators.validate(query, validators.idValidator);
  if (error) return { error };

  const { error: dbError, result } = await universityRepository.getUniversityById(value.id);

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { data: result, status: 200 } };
};

const createNewUniversity = async (body) => {
    const { value, error } = validators.validate(body, validators.universityValidator);
    if (error) return { error };
    
    const { error: dbError } = await universityRepository.createUniversity(value.country, value.city, value.name, value.accreditation );
  
    if (dbError) return { error: { status: 500, data: { error } } };
    return { result: { data: { created: 1 }, status: 201 } };
  };


const getAllUniversities = async ({page, perPage, name}) => {
  const { error: dbError, result } = await universityRepository.getUniversities({page, perPage, name});

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { data: result, status: 200 } };
};

module.exports = { getSingleUniversity, createNewUniversity, getAllUniversities };