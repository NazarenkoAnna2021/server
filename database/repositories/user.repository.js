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

function createWhereNameRole(name, role) {
  if (name && role) return `WHERE name ILIKE '%${name}%' AND role = '${role}'`;
  if (name) return `WHERE page.name ILIKE '%${name}%'`;
  if (role) return `WHERE page.role = '${role}'`;
  return '';
}

exports.getUserByUniversityId = async ({ page, perPage, id }, role) => {
  try {
    const first = (page * 10) - 10;
    const user = await pgClient.query(`SELECT * FROM (select * from users where role = '${role}' offset ${first || 0} LIMIT ${perPage || 10}) page WHERE page.university_Id = ${id || -1}`);
    return { result: user.rows };
  } catch (e) {
    return { error: e.message };
  }
};

exports.getUsers = async ({ page, perPage, name, role }) => {
  try {
    const first = (page * 10) - 10;
    const user = await pgClient.query(`SELECT * FROM (select * from users offset ${first || 0} LIMIT ${perPage || 10}) page ${createWhereNameRole(name, role)}`);
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