const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node_practice",
  password: "root",
});

module.exports = pool.promise();
