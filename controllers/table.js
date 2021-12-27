const userRepository = require('../database/repositories/user.repository');
const universityRepository = require('../database/repositories/university.repository');
const { getStudentRatingByCourse } = require('./user.controller');



const getTable = async function (page) {
    let table = [];
    const { error: dbError, result } = await universityRepository.getUniversities(page);
    if (dbError) return { error: { status: 500, data: { error } } };
    for (let element of result) {
        const { error: dbError, result } = await getStudentRatingByCourse({ id: element.id })
        if (dbError) return { error: { status: 500, data: { error } } };
        const row = {
            id: element.id,
            name: element.name,
            students: result.data
        }
        table.push(row);
    }
    return { result: { data: table, status: 200 } };
};

module.exports = { getTable };