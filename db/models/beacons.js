const Sequelize = require('sequelize');
const db = require('../db.js');

const beacon = db.define('beacon', {
  currentLocation: {
    type: Sequelize.ARRAY(Sequelize.FLOAT),
  },
})

module.exports = beacon;

