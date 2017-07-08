const Sequelize = require('sequelize');
const db = require('../db.js');
const bcrypt = require('bcrypt-nodejs');

const staticAngelStorefront = db.define('staticAngelStorefront', {
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
  city: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  zip: {
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

});
staticAngelStorefront.generateHash = password => bcrypt.hashSync(
  password,
  bcrypt.genSaltSync(8),
  null);
staticAngelStorefront.validPassword = password => bcrypt.compareSync(
  password,
  this.password);


module.exports = staticAngelStorefront;