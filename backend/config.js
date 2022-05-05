const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "musicmood.cw3zelm75qxy.ap-southeast-1.rds.amazonaws.com",
  user: "root",
  password: "RWK2OQugNmFJ",
  database: "musicmood",
  waitForConnections: true,
  connectionLimit: 50,
  queueLimit: 0,
  dateStrings: true,
  timezone: "Asia/Bangkok",
});

module.exports = pool;
