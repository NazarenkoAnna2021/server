const pgClient = require('../index');

const reqError = new error();

exports.createUser = async (role, name, age, university_id) => {
  try {
    await pgClient.query(`INSER INTO users(role, name, age, university_id)
     VALUES ('${role}', '${name}', ${age}, ${university_id})`);
    return { result: true };
  } catch (e) {
    return { error: e.message };
  }
};