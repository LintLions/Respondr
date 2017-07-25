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


const deviceToken = 'da8194613f804c50f8d23fbbcb530568e5d88b79d24fa8b6b484a604db97c067';
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
app.get('/pushtest', (req, res, next) => {
  // Push.push.send('da8194613f804c50f8d23fbbcb530568e5d88b79d24fa8b6b484a604db97c067', Push.apn);
  Push.push.send(deviceToken, Push.apnData)
    .then((results) => {
      console.log('RESULTS', results);
      return res.send(results);
    })
    .catch((err) => {
      console.log('err', err);
      return res.send(err);
    });
});

server.listen(port);

console.log(`Beacon running on: ${port}`);
