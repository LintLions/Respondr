const Sequelize = require('sequelize');
const db = require('../db.js');

const beacon = db.define('beacon', {
  currentLocation: {
    type: Sequelize.ARRAY(Sequelize.FLOAT),
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
})

module.exports = beacon;

