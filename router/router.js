const URL = require('url');

const { GET_USER, GET_ALL_USERS, CREATE_TEACHER, CREATE_STUDENT, UPDATE_USER, DELETE_USERS, GET_UNIVERSITY, GET_ALL_UNIVERSITIES, CREATE_UNIVERSITY } = require('../constants/routes');
const { getSingleUser, getAllUsers, createNewTeacher, createNewStudent, updateUser, deleteUser } = require('../controllers/user.controller');
const { getSingleUniversity, getAllUniversities, createNewUniversity } = require('../controllers/university.controller');
const { getUsers } = require('../database/repositories/user.repository');

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

    case method === 'GET' && pathname === GET_USER:
      ({ result, error } = await getSingleUser(query));
      break;

    case method === 'GET' && pathname === GET_ALL_USERS:
      ({ result, error } = await getAllUsers(query));
      break;
    case method === 'PUT' && pathname === UPDATE_USER:
      ({ result, error } = await updateUser(body, query));
      break;

    case method === 'DELETE' && pathname === DELETE_USERS:
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
