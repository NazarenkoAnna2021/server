const pgClient = require('../index');

const createString = (values, id) => {
  let str = 'UPDATE universities SET ';
  values.forEach((element, index, arr) => {
    str += element[0].concat("='", element[1], "'");
    if (index != arr.length - 1) str += ', ';
  });
  str += ` WHERE id = ${id};`;
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

  exports.getUniversities = async ({ page, prePage, name }) => {
    try {
      console.log(name)
      const first = (page * 10) - 10;
      const university = await pgClient.query(`SELECT * FROM (SELECT * FROM universities offset ${first || 0} LIMIT ${prePage || 10}) page 
      ${name ? `WHERE page.name ILIKE '%${name}%'` : ''}`);
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