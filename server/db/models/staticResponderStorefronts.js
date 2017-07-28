const Sequelize = require('sequelize');
const db = require('../db.js');
const bcrypt = require('bcrypt-nodejs');

const staticResponderStorefront = db.define('staticResponderStorefront', {
  image: {
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
  phone: {
    type: Sequelize.STRING,
  },
  Location: {
    type: Sequelize.ARRAY(Sequelize.FLOAT), //lat and longitude for marker. Should we use googlemaps geoutilites?
  },
  status: {
    type: Sequelize.STRING, // if logged in or on a mission
  },
  public: {
    type: Sequelize.BOOLEAN,
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
  }
});
staticResponderStorefront.generateHash = password => bcrypt.hashSync(
  password,
  bcrypt.genSaltSync(8),
  null);
staticResponderStorefront.validPassword = password => bcrypt.compareSync(
  password,
  this.password);


module.exports = staticResponderStorefront;