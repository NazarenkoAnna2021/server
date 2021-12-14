const pgClient = require('../index');

const createString = (values, id) => {
  let str = 'UPDATE universities SET ';
  values.forEach((element, index, arr) => {
    str += element[0].concat("='", element[1], "'");
    if (index != arr.length - 1) str += ', ';
  });
  str += ` WHERE id = ${id};`;
  console.log(str);
  return str;
};

exports.createUniversity = async (country, city, name, accreditation) => {
    try {
      await pgClient.query(`INSERT INTO universities(country, city, name, accreditation) VALUES ('${country}', '${city}', '${name}', '${accreditation}');`);
      return { result: true };
    } catch (e) {
      return { error: e.message };
    }
  };

exports.getUniversityById = async (id) => {
  try {
    const university = await pgClient.query(`SELECT * FROM universities WHERE id = ${id} LIMIT 1`);
    return { result: university.rows[0] };
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

  exports.updateUniversityById = async (values, id) => {
    try {
      const university = await pgClient.query(createString(values, id));
      return { result: university.rows[0] };
    } catch (e) {
      return { error: e.message };
    }
  }
  
  exports.deleteUniversityById = async (id) => {
    try {
      const university = await pgClient.query(`Delete FROM universities WHERE id = ${id}`);
      return { result: university.rows[0] };
    } catch (e) {
      return { error: e.message };
    }
  };