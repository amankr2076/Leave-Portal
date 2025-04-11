const mysql = require('mysql2/promise');
require('dotenv').config();

let connection = null;

const connectDB = async () => {
  if (connection) {
    return connection; // Return existing connection if already established
  }

  try {
    const password = process.env.PASSWORD;
    const dbName = process.env.DATABASE;
    const host = process.env.HOST;
    const user = process.env.USER;

    connection = await mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: dbName,
    });
    
    console.log('Connected to MySQL database.');
    return connection;
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
};

module.exports = connectDB;
