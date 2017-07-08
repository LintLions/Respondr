const Sequelize = require('sequelize');
const db = require('../db.js');
const bcrypt = require('bcrypt-nodejs');

const dynamicAngel = db.define('dynamicAngel', {
  image: {
    type: Sequelize.STRING,
  },
  firstName: {
    type: Sequelize.STRING, allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING, allowNull: false,
  },
  fullName: {
    type: Sequelize.STRING, allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
  organization: {
    type: Sequelize.STRING,
  },
  responses: {
    type: Sequelize.INTEGER,
  },
  currentLocation: {
    type: Sequelize.ARRAY(Sequelize.FLOAT),
  },
  status: {
    type: Sequelize.STRING, // if logged in or on a mission
  },
  public: {
    type: Sequelize.BOOLEAN,
  },

});
dynamicAngel.generateHash = password => bcrypt.hashSync(
  password,
  bcrypt.genSaltSync(8),
  null);
dynamicAngel.validPassword = password => bcrypt.compareSync(
  password,
  this.password);


module.exports = dynamicAngel;