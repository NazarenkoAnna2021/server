const pgClient = require('../index');

exports.createCourses = async ({ name, teachers_id }) => {
  try {
    await pgClient.query(`INSERT INTO courses (name, university_id, teachers_id) VALUES('${name}', (select university_id from users where id=${teachers_id}), ${teachers_id});`);

    return { result: true };
  } catch (e) {
    return { error: e.message };
  }
};


exports.getCoursesByUniversityId = async ({ page, perPage, id }) => {
  try {
    const first = (page * 10) - 10;
    const courses = await pgClient.query(`SELECT * FROM courses WHERE university_id = ${id} offset ${first || 0} LIMIT ${perPage || 10}`);
    return { result: courses.rows };
  } catch (e) {
    return { error: e.message };
  }
};

exports.enrollStudentToCourse = async ({ students_id, courses_id }) => {
  try {
    const enroll = await pgClient.query(`
    INSERT INTO students_courses (students_id, courses_id) select ${students_id}, ${courses_id} 
    where exists (select 1 from users u, courses c 
          where u.university_id = c.university_id AND u.id = ${students_id} AND c.id = ${courses_id} AND u."role" = 'student')
    returning students_id, courses_id;
    `);
    return { result: enroll.rows[0] };
  } catch (e) {
    return { error: e.message };
  }
};

exports.expelStudentById = async (id) => {
  try {
    const course = await pgClient.query(`Delete FROM students_courses WHERE exists (select 1 from users u 
      where u.id = ${id} AND u."role" = 'student')
    `);
    return { result: course.rows[0] };
  } catch (e) {
    return { error: e.message };
  }
};

exports.deleteCourseById = async (id) => {
  try {
    const course = await pgClient.query(`Delete FROM courses WHERE id = ${id}`);
    return { result: course.rows[0] };
  } catch (e) {
    return { error: e.message };
  }
};