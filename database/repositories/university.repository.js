const pgClient = require('../index');

exports.getUniversityById = async (id) => {
  try {
    const university = await pgClient.query(`SELECT * FROM universities WHERE id = ${id} LIMIT 1`);
    return { result: university.rows[0] };
  } catch (e) {
    return { error: e.message };
  }
};

exports.createUniversity = async (country, city, name, accreditation) => {
    try {
      await pgClient.query(`INSERT INTO universities(country, city, name, accreditation) VALUES ('${country}', '${city}', '${name}', '${accreditation}');`);
      return { result: true };
    } catch (e) {
      return { error: e.message };
    }
  };