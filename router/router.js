const URL = require('url');

const { CREATE_TEACHER } = require('../constants/routes');
const createNewTeacher = require('../controllers/user.controller').createNewTeacher;

const router = async ({ req, res, body }) => {
  let result, error;
  const { method, url } = req;
  const { query, pathname } = URL.parse(url, true);
  switch (true) {
    case method === 'POST' && pathname === CREATE_TEACHER:
      ({ result, error } = await createNewTeacher(body));
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