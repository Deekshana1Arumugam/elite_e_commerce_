const { Sequelize } = require('sequelize');
require('dotenv').config();

// Set up the Sequelize connection using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME, // database name
  process.env.DB_USER, // database user
  process.env.DB_PASSWORD, // database password
  {
    host: process.env.DB_HOST, // database host
    dialect: 'mysql', // database type (MySQL)
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected!');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
