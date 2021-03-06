const Sequelize = require('sequelize');
const db = require('../db.js');
const bcrypt = require('bcrypt-nodejs');

const dynamicResponder = db.define('dynamicResponder', {
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
  privacy: {
    type: Sequelize.BOOLEAN,
  },
  OS: {
    type: Sequelize.STRING,
  },
  token: {
    type: Sequelize.STRING(1000),
  },
  socket: {
    type: Sequelize.STRING(1000),
  },
  lastNotification: {
    type: Sequelize.DATE,
  },
  device: {
    type: Sequelize.STRING,
  },
  geometry: {
    type: Sequelize.GEOMETRY,
  },
  route: {
    type: Sequelize.STRING(1000),
  },
  available: {
    type: Sequelize.BOOLEAN,
  },
  mobility: {
    type: Sequelize.INTEGER,
  },
});
dynamicResponder.generateHash = password => bcrypt.hashSync(
  password,
  bcrypt.genSaltSync(8),
  null);
dynamicResponder.validPassword = password => bcrypt.compareSync(
  password,
  this.password);


module.exports = dynamicResponder;
