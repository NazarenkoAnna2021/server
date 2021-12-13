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

  exports.getUniversities = async ({ page, perPage, name }) => {
    try {
      const first = (page * 10) - 10;
      console.log('rep: ', page, name, first);
      const university = await pgClient.query(`SELECT * FROM universities ${name ? `WHERE name ILIKE '%${name}%' ` : ''}LIMIT ${perPage || 10} offset ${!name ? first : 0}`);
      console.log(university.rows);
      return { result: university.rows };
    } catch (e) {
      return { error: e.message };
    }
  }; 