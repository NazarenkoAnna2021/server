const pgClient = require('../index');

exports.createMark = async ({mark, student_id, course_id, university_id}) => {
    try {
        const marks =  await pgClient.query(`
        INSERT INTO marks(mark, student_id, course_id, university_id) SELECT ${mark}, ${student_id}, ${course_id}, ${university_id}
        where exists (select 1 from students_courses sc where sc.students_id = ${student_id} and sc.courses_id = ${course_id})
        returning mark, student_id, course_id, university_id;;`);
        return { result: marks.rows[0] };
    } catch (e) {
        return { error: e.message };
    }
};