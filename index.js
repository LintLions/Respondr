const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
require('node-env-file')(path.join(__dirname, '/.env'));
const users = require('./server/routers/users');
const beaconsRouter = require('./server/routers/beaconsRouter');
const db = require('./server/db/db.js');

const app = express();
module.exports = app;
const port = process.env.PORT || 3000;
const { socketUsers, socketio, websocket, server } = require('./server/controllers/socket.js');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));
  app.use(errorhandler());
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', users)
app.use('/beacons', beaconsRouter)
app.get('', (req, res, next) => {
  res.send('HEY');
  next();
});

server.listen(port);

console.log(`Beacon running on: ${port}`);
