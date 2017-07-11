const express = require('express');
const beaconsRouter = express.Router();
const controller = require('./controller');

beaconsRouter.post('', controller.addBeacon)

module.exports = beaconsRouter