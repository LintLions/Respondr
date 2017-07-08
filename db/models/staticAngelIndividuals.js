const Sequelize = require('sequelize');
const db = require('../db.js');
const bcrypt = require('bcrypt-nodejs');

const staticAngelIndividual = db.define('staticAngelIndividual', {
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
  public: {
    type: Sequelize.BOOLEAN,
  },
  hours: {
    type: Sequelize.RANGE(Sequelize.DATE)
  }
});
staticAngelIndividual.generateHash = password => bcrypt.hashSync(
  password,
  bcrypt.genSaltSync(8),
  null);
staticAngelIndividual.validPassword = password => bcrypt.compareSync(
  password,
  this.password);


module.exports = staticAngelIndividual;