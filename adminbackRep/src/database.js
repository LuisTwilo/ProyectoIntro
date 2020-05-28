const mysql = require("mysql");
const { dataBase } = require("./keys");
const { promisify } = require("util");

const pool = mysql.createPool(dataBase);

pool.getConnection((err, connection) => {
  if (err) console.error(err);

  if (connection) {
    connection.release();
    console.log("DB Connected");
  }
  return;
});

pool.query = promisify(pool.query);
module.exports = pool;
