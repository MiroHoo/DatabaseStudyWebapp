
const mysql = require('mysql2');
const connection = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: process.env.DBPassword,
  database: process.env.DBName
});
module.exports = connection;