const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'musicmood',
  waitForConnections: true,
  connectionLimit: 50,
  queueLimit: 0,
  dateStrings: true
});

module.exports = pool;