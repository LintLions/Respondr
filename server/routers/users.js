const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const controller = require('../controllers/controller');

const users = [{
  id: 1,
  username: 'gonto',
  email: 'gonto',
  password: 'gonto',
}];

router.get('/', controller.getUser);

router.post('/nearby', controller.getNearbyResponders);

router.get('/all', controller.getUsers); // auth.check, auth.restrict('full_access'),

router.post('', controller.addUser);

router.post('/sessions/create', controller.addSession);

module.exports = router;
