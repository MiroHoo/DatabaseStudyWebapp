
const mysql = require('mysql2');
const connection = mysql.createPool({
  host: process.env.DBurl,
  user: process.env.DBUser,
  password: process.env.DBPassword,
  database: process.env.DBName
});
module.exports = connection;