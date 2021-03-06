const express = require('express');
const beaconsRouter = express.Router();
const controller = require('../controllers/controller');

beaconsRouter.post('', controller.addBeacon)
beaconsRouter.put('', controller.deleteBeacon)

module.exports = beaconsRouter