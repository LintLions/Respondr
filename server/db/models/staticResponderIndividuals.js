const Sequelize = require('sequelize');
const db = require('../db.js');
const bcrypt = require('bcrypt-nodejs');

const staticResponderIndividual = db.define('staticResponderIndividual', {
  image: {
    type: Sequelize.STRING,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
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
  street: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  zip: {
    type: Sequelize.STRING,
  },
  location: {
    type: Sequelize.ARRAY(Sequelize.FLOAT), //lat and longitude for marker. Should we use googlemaps geoutilites?
  },
  status: {
    type: Sequelize.STRING, // if logged in or on a mission
  },
  privacy: {
    type: Sequelize.BOOLEAN,
  },
  hours: {
    type: Sequelize.RANGE(Sequelize.DATE)
  },
  OS: {
    type: Sequelize.STRING,
  },
  token: {
    type: Sequelize.STRING,
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
  mobility: {
    type: Sequelize.INTEGER,
  },
});
staticResponderIndividual.generateHash = password => bcrypt.hashSync(
  password,
  bcrypt.genSaltSync(8),
  null);
staticResponderIndividual.validPassword = password => bcrypt.compareSync(
  password,
  this.password);


module.exports = staticResponderIndividual;