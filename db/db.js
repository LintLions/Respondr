const Sequelize = require('sequelize');
const config = require('../private/dbconfig');

const url = process.env.databaseURL || config.databaseUrl;
const options = process.env.databaseOptions || config.databaseOptions;

const db = new Sequelize(url, options);

db
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.log('Unable to connect to the database:', err));

module.exports = db;