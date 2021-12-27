const URL = require('url');

const { CREATE_TEACHER, CREATE_STUDENT, GET_TEACHER, GET_STUDENT, GET_STUDENT_BY_COURSE, UPDATE_USER, DELETE_USER, GET_UNIVERSITY, GET_ALL_UNIVERSITIES, CREATE_UNIVERSITY, UPDATE_UNIVERSITY, DELETE_UNIVERSITY, CREATE_COURSE, GET_COURSE, DELETE_COURSE, CREATE_ENROLL, CREATE_MARK, GET_RATING, GET_TABLE } = require('../constants/routes');
const { getTeacher, getStudent, getStudentByCourse, getStudentRatingByCourse, createNewTeacher, createNewStudent, updateUser, deleteUser } = require('../controllers/user.controller');
const { createNewUniversity, getSingleUniversity, getAllUniversities, updateUniversity, deleteUniversity } = require('../controllers/university.controller');
const { createNewCourses, getCourses, deleteCourses, enrollToCourse } = require('../controllers/courses.controller');
const { createNewMark } = require('../controllers/marks.controller');
const { getTable } = require('../controllers/table');

const router = async ({ req, res, body }) => {
  let result, error;
  const { method, url } = req;
  const { query, pathname } = URL.parse(url, true);
  switch (true) {
    case method === 'POST' && pathname === CREATE_TEACHER:
      ({ result, error } = await createNewTeacher(body));
      break;
    case method === 'POST' && pathname === CREATE_STUDENT:
      ({ result, error } = await createNewStudent(body));
      break;
    case method === 'GET' && pathname === GET_TEACHER:
      ({ result, error } = await getTeacher(query));
      break;
    case method === 'GET' && pathname === GET_STUDENT:
      ({ result, error } = await getStudent(query));
      break;
    case method === 'GET' && pathname === GET_STUDENT_BY_COURSE:
      ({ result, error } = await getStudentByCourse(query));
      break;
      case method === 'GET' && pathname === GET_RATING:
        ({ result, error } = await getStudentRatingByCourse(query));
        break;
    case method === 'PUT' && pathname === UPDATE_USER:
      ({ result, error } = await updateUser(body, query));
      break;
    case method === 'DELETE' && pathname === DELETE_USER:
      ({ result, error } = await deleteUser(query));
      break;

    case method === 'POST' && pathname === CREATE_UNIVERSITY:
      ({ result, error } = await createNewUniversity(body));
      break;
    case method === 'GET' && pathname === GET_UNIVERSITY:
      ({ result, error } = await getSingleUniversity(query));
      break;
    case method === 'GET' && pathname === GET_ALL_UNIVERSITIES:
      ({ result, error } = await getAllUniversities(query));
      break;
    case method === 'PUT' && pathname === UPDATE_UNIVERSITY:
      ({ result, error } = await updateUniversity(body, query));
      break;
    case method === 'DELETE' && pathname === DELETE_UNIVERSITY:
      ({ result, error } = await deleteUniversity(query));
      break;

    case method === 'POST' && pathname === CREATE_COURSE:
      ({ result, error } = await createNewCourses(body));
      break;
    case method === 'POST' && pathname === CREATE_ENROLL:
      ({ result, error } = await enrollToCourse(body));
      break;
    case method === 'POST' && pathname === CREATE_MARK:
      ({ result, error } = await createNewMark(body));
      break;
    case method === 'GET' && pathname === GET_COURSE:
      ({ result, error } = await getCourses(query));
      break;
    case method === 'DELETE' && pathname === DELETE_COURSE:
      ({ result, error } = await deleteCourses(query));
      break;

      case method === 'GET' && pathname === GET_TABLE:
        ({ result, error } = await getTable(query));
        break;

    default:
      res.statusCode = 404;
      return res.end(JSON.stringify({ error: 'Route Not Found' }));
  }

  if (error) {
    res.statusCode = error.status;
    return res.end(JSON.stringify({ error }));
  }
  res.statusCode = result.status;
  res.end(JSON.stringify(result.data));
};

module.exports = { router };
