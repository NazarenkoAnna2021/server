const pgClient = require('../index');

exports.createUser = async (role, name, age, university_id) => {
  try {
    await pgClient.query(`INSERT INTO users(role, name, age, university_id)
     VALUES ('${role}', '${name}', ${age}, ${university_id})`);

    return { result: true };
  } catch (e) {
    return { error: e.message };
  }
};