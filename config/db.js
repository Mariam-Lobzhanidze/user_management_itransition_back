const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    registration_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   lastLoginTime TIMESTAMP NULL,
    status ENUM('active', 'blocked') DEFAULT 'active'
  );
`;

pool.query(createTableQuery, (err) => {
  if (err) {
    console.error("Error creating users table: ", err);
  } else {
    console.log("Users table created or already exists.");
  }
});

module.exports = pool.promise();
