const validators = require('./validation');
const universityRepository = require('../database/repositories/courses.repository');

const createNewCourses = async (body) => {
  const { value, error } = validators.validate(body, validators.universityValidator);
  if (error) return { error };

  const { error: dbError } = await universityRepository.createCourses(value.name, value.university_id, value.teachers_id);

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { data: { created: 1 }, status: 201 } };
};

const getSingleCourses = async (query) => {
  const { value, error } = validators.validate(query, validators.idValidator);
  if (error) return { error };

  const { error: dbError, result } = await universityRepository.getUniversityById(value.id);

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { data: result, status: 200 } };
};


const getAllCourses = async ({ page, perPage, name }) => {
  const { error: dbError, result } = await universityRepository.getCourses({ page, perPage, name });

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { data: result, status: 200 } };
};

const updateCourses = async (body, query) => {
  const { value, error } = validators.validate(query, validators.idValidator);
  if (error) return { error };

  const changes = Object.entries(body);
  
  const { error: dbError, result } = await universityRepository.updateCoursesById(changes, value.id);

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { data: result, status: 200 } };
};

const deleteCourses = async (query) => {
  const { value, error } = validators.validate(query, validators.idValidator);
  if (error) return { error };

  const { error: dbError } = await universityRepository.deleteCoursesById(value.id);

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { deleted: 1, status: 200 } };
};

module.exports = { createNewCourses, getSingleCourses, getAllCourses, updateCourses, deleteCourses };