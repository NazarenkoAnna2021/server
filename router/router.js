const URL = require('url');

const { GET_USER, GET_ALL_USERS, CREATE_USER, UPDATE_USER, DELETE_USERS } = require('../constants/routes');
const { getSingleUser, getAllUsers, createUser, updateUser, deleteUser } = require('../controllers/user.controller');
const { getUsers } = require('../database/repositories/user.repository');

const router = async ({ req, res, body }) => {
  let result, error;
  const { method, url } = req;
  const { query, pathname } = URL.parse(url, true);  
  switch (true) {
    case method === 'GET' && pathname === GET_USER:
      ({ result, error } = await getSingleUser(query));
      break;

    case method === 'GET' && pathname === GET_ALL_USERS:
      ({ result, error } = await getAllUsers());
      break;

    case method === 'POST' && pathname === CREATE_USER:
      ({ result, error } = await createUser(body));
      break;

      case method === 'PUT' && pathname === UPDATE_USER:
      ({ result, error } = await updateUser(body, query));
      break;

      case method === 'DELETE' && pathname === DELETE_USERS:
      ({ result, error } = await deleteUser(query));
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
