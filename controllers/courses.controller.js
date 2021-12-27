const validators = require('./validation');
const coursesRepository = require('../database/repositories/courses.repository');

const createNewCourses = async (body) => {
  const { value, error } = validators.validate(body, validators.coursesValidator);
  if (error) return { error };

  const { error: dbError } = await coursesRepository.createCourses(value);

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { data: { created: 1 }, status: 201 } };
};

const getCourses = async (query) => {
  const { value, error } = validators.validate(query, validators.idValidator);
  if (error) return { error };

  const { error: dbError, result } = await coursesRepository.getCoursesByUniversityId(value);

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { data: result, status: 200 } };
};

const deleteCourses = async (query) => {
  const { value, error } = validators.validate(query, validators.idValidator);
  if (error) return { error };

  const { error: dbError } = await coursesRepository.deleteCourseById(value.id);

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { deleted: 1, status: 200 } };
};

const expelStudent = async (query) => {
  const { value, error } = validators.validate(query, validators.idValidator);
  if (error) return { error };

  const { error: dbError } = await coursesRepository.expelStudentById(value.id);

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { deleted: 1, status: 200 } };
};

const enrollToCourse = async (body) => {
  const { value, error } = validators.validate(body, validators.doubleIdValidator);
  if (error) return { error };

  const { error: dbError, result } = await coursesRepository.enrollStudentToCourse(value);

  if (dbError) return { error: { status: 500, data: { error } } };
  return { result: { data: result, status: 201 } };
}

module.exports = { createNewCourses, getCourses, deleteCourses, expelStudent, enrollToCourse };