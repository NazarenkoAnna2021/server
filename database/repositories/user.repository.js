const pgClient = require('../index');

const createString = (values, id) => {
  let str = 'UPDATE users SET ';
  values.forEach((element, index, arr) => {
    str += element[0].concat("='", element[1], "'");
    if (index != arr.length - 1) str += ', ';
  });
  str += ` WHERE id = ${id};`;
  return str;
};

exports.createUser = async (role, name, age, university_id) => {
  try {
    await pgClient.query(`INSERT INTO users(role, name, age, university_id)
     VALUES ('${role}', '${name}', ${age}, ${university_id})`);

    return { result: true };
  } catch (e) {
    return { error: e.message };
  }
};

exports.getUserByUniversityId = async ({ id, prePage, page, name }, role) => {
  try {
    const first = (page * 10) - 10;
    const user = await pgClient.query(`
    SELECT * FROM (select * from users where role = '${role}') page 
    WHERE page.university_id = ${id} ${name ? `AND page.name ILIKE '%${name}%'` : ''} 
    offset ${first || 0} LIMIT ${prePage || 10};
   `);
    return { result: user.rows };
  } catch (e) {
    return { error: e.message };
  }
};

exports.getStudentByCourseId = async ({ page, perPage, name, id }) => {
  try {
    const first = (page * 10) - 10;
    console.log(typeof name);
    const user = await pgClient.query(`
    SELECT page.* FROM (select * from users where role = 'student' offset ${first || 0} LIMIT ${perPage || 10}) page, students_courses sc  
    WHERE sc.students_id = page.id and sc.courses_id = ${id} 
    and page.name SIMILAR TO '%(${name}|${await pgClient.query(`SELECT u.name FROM users u, students_courses sc  
    WHERE sc.students_id = u.id and sc.courses_id = ${id};`)})%';
    `);
    return { result: user.rows };
  } catch (e) {
    return { error: e.message };
  }
};

exports.getStudentRatingByCourseId = async ({ id, prePage }) => {
  try {
    const user = await pgClient.query(`
    SELECT u.id, u.name, avg_mark.rating FROM 
    (SELECT m.student_id , avg(m.mark) AS rating FROM marks m WHERE m.university_id = ${id} GROUP BY m.student_id LIMIT ${prePage || 100}) 
    avg_mark, users u WHERE u.id = avg_mark.student_id 
    ORDER BY avg_mark.rating DESC;
    `);
    return { result: user.rows };
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
    const user = await pgClient.query(`Delete FROM users WHERE id = ${id} AND role = 'student';`);
    return { result: user.rows[0] };
  } catch (e) {
    return { error: e.message };
  }
};