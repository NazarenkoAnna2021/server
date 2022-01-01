const { user } = require('pg/lib/defaults');
const pgClient = require('../index');

class requestError {
  name = 'requestError';
  constructor(message){
  this.message = message || 'Invalid request';
  this.stack = (new Error()).stack;
  }
}

requestError.prototype = Object.create(Error.prototype);
requestError.prototype.constructor = requestError;

exports.createUser = async (role, name, age, university_id) => {
  try {
    const user = await pgClient.query(`INSER INTO users(role, name, age, university_id)
     VALUES ('${role}', '${name}', ${age}, ${university_id})`);
    if(user) return { result: user.rows[0] };
    throw new requestError();
  } catch (e) {
    return { error: e.message };
  }
};
