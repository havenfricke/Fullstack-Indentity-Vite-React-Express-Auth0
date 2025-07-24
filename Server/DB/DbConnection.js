const mysql = require('mysql2/promise');

let connection = null;

async function query(sql, params) {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_CONNECTION_STRING,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    });
  }
  const [results] = await connection.execute(sql, params);
  
  if (results.changedRows === 0) {
    console.log('[INFO] Update successful, but no values changed.');
  }
  return results;
}

module.exports = {
  query
};
