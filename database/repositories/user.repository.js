const pgClient = require('../index');

exports.getUserById = async (id) => {
  try {
    const user = await pgClient.query(`SELECT * FROM users WHERE id = ${id} LIMIT 1`);
    return { result: user.rows[0] };
  } catch (e) {
    return { error: e.message };
  }
};

exports.getUsers = async () => {
  try {
    const user = await pgClient.query(`SELECT * FROM users`);
    console.log(user.rows);
    return { result: user.rows };
  } catch (e) {
    return { error: e.message };
  }
};

exports.createUser = async (role, name, age, university_id) => {
  try {
    await pgClient.query(`INSERT INTO users(role, name, age, university_id) VALUES ('${role}', '${name}', ${age}, ${university_id})`);
    return { result: true };
  } catch (e) {
    return { error: e.message };
  }
};

const createString = (values, id) => {
  let str = 'UPDATE users SET ';
  values.forEach((element, index, arr) => {
    str += element[0].concat("='", element[1], "'");
    if (index != arr.length - 1) str += ', ';
  });
  str += ` WHERE id = ${id};`;
  return str;
}

exports.updateUserById = async (values, id) => {
  try {
    const user = await pgClient.query(createString(values, id));
    return { result: user.rows[0] };
  } catch (e) {
    return { error: e.message };
  }
}

exports.deleteUserById = async (id) => {
  try {
    const user = await pgClient.query(`Delete FROM users WHERE id = ${id}`);
    return { result: user.rows[0] };
  } catch (e) {
    return { error: e.message };
  }
};