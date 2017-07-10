const express = require('express');
const router = express.Router();
const auth = require('./auth');
const controller = require('./controller');
const dynamicAngels = require('../db/models/dynamicAngels.js');

const users = [{
  id: 1,
  username: 'gonto',
  email: 'gonto',
  password: 'gonto'
}];

router.get('/', function (req, res) {
  res.send('users route')
})
router.get('/all', auth.check, auth.restrict('full_access'), controller.getUsers)

router.post('', controller.addUser);

router.post('/sessions/create', controller.addSession);

module.exports = router;
