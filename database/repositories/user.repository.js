const pgClient = require('../index');

const createString = (values, id) => {
  let str = 'UPDATE users SET ';
  values.forEach((element, index, arr) => {
    str += element[0].concat("='", element[1], "'");
    if (index != arr.length - 1) str += ', ';
  });
  str += ` WHERE id = ${id};`;
  console.log(str);
  return str;
};

exports.getUserById = async (id) => {
  try {
    const user = await pgClient.query(`SELECT * FROM users WHERE id = ${id} LIMIT 1`);
    return { result: user.rows[0] };
  } catch (e) {
    return { error: e.message };
  }
};

exports.getUsers = async ({ page, perPage, name }) => {
  try {
    const first = (page * 10) - 10;
    console.log('rep: ', page, name, first);
    const user = await pgClient.query(`SELECT * FROM users ${name ? `WHERE name ILIKE '%${name}%' ` : ''}LIMIT ${perPage || 10} offset ${!name ? first : 0}`);
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