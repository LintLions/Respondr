const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const controller = require('../controllers/controller');

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

router.get('/getUser', controller.getUserWithToken);

router.post('', controller.addUser);

router.post('/sessions/create', controller.addSession);



module.exports = router;
