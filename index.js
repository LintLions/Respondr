require('node-env-file')(__dirname + '/.env');

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
// const passport = require('passport');
// const session = require('express-session');
// const RedisStore = require('connect-redis')(session)
// const controller = require('./server/controller.js');
// const db = require('./db/models/db.js');
// const Session = require('./db/models/session.js');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
const users = require('./server/users');

// const extendDefaultFields = (defaults, session) => ({ // config for holding session in db
//   userId: session.userId,
// });
const port = process.env.PORT || 8080;
const app = express();
module.exports = app;

// require('./server/passport')(passport);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));
  app.use(errorhandler())
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({
//   store: new RedisStore({
//     url: config.redisStore.url
//   }),
//   secret: 'MrButtonPHDnotMDmaybeDRnotSure',
//   saveUninitialized: false,
//   resave: false,
//   proxy: undefined,
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(controller.publicRoutes, express.static(path.join(__dirname, '/public')));
// require('./server/routes.js')(app, passport);
app.use('/users', users)
app.get('', (req, res, next) => {
  res.send('HEY');
  next();
});

app.listen(port);

console.log(`Beacon running on: ${port}`);
