const Sequelize = require("sequelize");

const sequelize = new Sequelize("node_practice", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;

// mysql2 driver pooling
// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node_practice",
//   password: "root",
// });

// module.exports = pool.promise();
