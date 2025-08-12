
const mysql = require('mysql2');
const connection = mysql.createPool({
  host: process.env.DBurl,
  port: process.env.DBPort,
  user: process.env.DBUser,
  password: process.env.DBPassword,
  database: process.env.DBName
});
module.exports = connection;