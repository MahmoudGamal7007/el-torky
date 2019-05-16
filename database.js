const mysql = require('mysql');


var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME
});
connection.connect();
module.exports = connection
