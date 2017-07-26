const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
require('node-env-file')(path.join(__dirname, '/.env'));
const users = require('./server/routers/users');
const beaconsRouter = require('./server/routers/beaconsRouter');
const Push = require('./server/controllers/push');

const app = express();
module.exports = app;
const port = process.env.PORT || 3000;
const { server } = require('./server/controllers/socket.js');


const deviceTokens = ['7c6ad039bedee7a60317c0a65e25584b755326f74cfa3d410a23178cf446143d'];
// const deviceToken = '6185a90be174514adaccdb1aa47b30e29a84bc69';
// const note = new apn.Notification();

// note.expiry = Math.floor(Date.now() / 1000) + 5; // 5 seconds
// note.badge = 0;
// note.sound = 'ping.aiff';
// note.alert = 'You have a new message';
// note.payload = { messageFrom: 'John Appleseed' };
// note.topic = 'com.respondrapp.respondr';

if (process.env.NODE_ENV === 'development') {
  app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));
  app.use(errorhandler());
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', users);
app.use('/beacons', beaconsRouter);
app.get('', (req, res, next) => {
  res.send('HEY');
  next();
});
app.get('/pushtest', (req, res) => {
  const pushMessage = {
    title: 'Matt got beef?',
    body: '...\nRoast Beef',
  };
  Push.push.send(deviceTokens, Push.apnData(pushMessage))
    .then(results => res.send(results))
    .catch(err => res.send(err));
});

server.listen(port);

console.log(`Beacon running on: ${port}`);
