const dynamicResponder = require('../db/models/dynamicResponders.js');
const staticResponder = require('../db/models/staticResponderIndividuals.js');
const beacon = require('../db/models/beacons.js');
const _ = require('lodash');
const db = require('../db/db');
const config = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const radius = 3000;
const LATITUDE_DELTA = 0.0015;
const LONGITUDE_DELTA = 0.0015;

function createIdToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*60*5 });
}
function createAccessToken() {
  return jwt.sign({
    iss: config.issuer,
    aud: config.audience,
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    scope: 'full_access',
    sub: "lalaland|gonto",
    jti: genJti(), // unique identifier for the token
    alg: 'HS256'
  }, config.secret);
}
function genJti() {
  let jti = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 16; i++) {
      jti += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  
  return jti;
}
function getUserScheme(req) {
  let username = '';
  let type = '';
  let userSearch = {};

  // The POST contains a username and not an email
  if (req.body.username) {
    username = req.body.username;
    type = 'username';
    userSearch = { username: username };
  }
  // The POST contains an email and not an username
  else if (req.body.email) {
    username = req.body.email;
    type = 'email';
    userSearch = { email: username };
  }

  return {
    username,
    type,
    userSearch,
  };
}

exports.addUser = (req, res) => {
  const userScheme = getUserScheme(req);
  console.log("req.body is ", req.body);
  console.log("userScheme is ", userScheme);
  if (!userScheme.username || !req.body.password) {
    return res.status(400).send({ error: 'You must send the username and the password' });
  }
  if (req.body.mobility === 0) {
    dynamicResponder.findOne({ where: userScheme.userSearch }).then((user) => {
      if (user) {
        return res.status(400).send({ error: 'A user with that username already exists' });
      }
      dynamicResponder.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        organization: req.body.organization,
        email: req.body.email,
        password: dynamicResponder.generateHash(req.body.password),
        privacy: !!req.body.privacy,
        fullName: `${req.body.firstName} ${req.body.lastName}`,
        token: createIdToken(req.body.email),
        socket: req.body.socket,
      }).then((newUser) => {
        const decor = { access_token: createAccessToken(), success: true };
        const result = Object.assign({}, newUser.dataValues, decor);
        res.status(201).send(result);
      }).catch((err) => {
        console.error(`ERROR during create dynamicResponder => addUser ${err}`);
        res.status(500).send({ error: 'umm, I asked the server to let you in, but it said nah' });
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  } else if (req.body.mobility === 1) {
    staticResponder.findOne({ where: userScheme.userSearch }).then((user) => {
      if (user) {
        return res.status(400).send({ error: 'A user with that username already exists' });
      }
      staticResponder.create({
        fullName: req.body.fullName,
        phone: req.body.phone,
        organization: req.body.organization,
        email: req.body.email,
        password: dynamicResponder.generateHash(req.body.password),
        privacy: !!req.body.privacy,
        token: createIdToken(req.body.email),
        socket: req.body.socket,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        location: req.body.location,
        geometry: req.body.geometry,
      }).then((newUser) => {
        const decor = { access_token: createAccessToken(), success: true };
        const result = Object.assign({}, newUser.dataValues, decor);
        res.status(201).send(result);
      }).catch((err) => {
        console.error(`ERROR during create dynamicResponder => addUser ${err}`);
        res.status(500).send({ error: 'umm, I asked the server to let you in, but it said nah' });
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  }
};

exports.addSession = (req, res) => {
  console.log('loginBody', req.body);
  const userScheme = getUserScheme(req);
  console.log(userScheme);
  if (!userScheme.username || !req.body.password) {
    return res.status(400).send({
      error: 'You must send the username and the password',
    });
  }

  dynamicResponder.findOne({ where: userScheme.userSearch })
  .then((user) => {
    if (!user) {
      return res.status(401).send({error: "The username is incorrect"});
    } else if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send({ error: 'The username and password do not match' });
    }
    return user.update({
      socket: req.body.socket,
      token: createIdToken(user.email),
    })
    .then((updated) => {
      const access = { access_token: createAccessToken() };
      const result = Object.assign({}, updated.dataValues, access);
      console.log(result);
      return res.status(201).send(result);
    })
    .catch(err => console.log(err) && res.status(500).send({
      error: 'You are logged in, but the server could not update your token and socket',
      user,
      access_token: createAccessToken(),
    }));
  })
  .catch(err => console.log(err) && res.status(500).send({
    error: 'The db could not find ya bro',
  }));
};

exports.getUser = (req, res) => {
  const socket = req.query.socket;
  const query = delete req.query.socket && req.query;
  dynamicResponder.findOne({ where: query })
    .then((user) => {
      if (user) {
        return user.update({ socket })
          .then(() => res.status(201).send(user))
          .catch(() => res.status(500).send({
            error: 'uhh, the server found you and then ran away... fast!',
          }));
      }
      return res.status(400).send({ error: 'No user with that token_id found' });
    })
    .catch(() => res.status(500).send({
      error: 'Looks like the DB gots beef. Come back later with Chicken.',
    }));
};

exports.getUsers = function (req, res) {
  dynamicResponder.findAll({})
  .then((results) => {
    console.log(results);
    res.send(results);
  }).catch((err) => {
    console.error(err, ' on line 116');
    res.sendStatus(500);
  });
};

// Controller for updating userLocation(geometry) field in DB. Needs location 
// and user email from body.
exports.updateLocation = function (req, res) {
  // console.log('req.body in updateLocation is: ', req.body)
  dynamicResponder.findOne( { where: {token: req.body.token} })
  .then((user) => {
    if (user) {
      console.log('token in updateLocationController is: ', user.token);
      // console.log('user.geometry in updateLocationController is: ', user.geometry)
      user.geometry.coordinates[0] = req.body.location[0];
      user.geometry.coordinates[1] = req.body.location[1];
      return user.update({
        currentLocation: req.body.location,
        geometry: user.geometry,
      })
      .then((updatedUser) => {
        console.log('updatedUserGeometry is: ', updatedUser.geometry)
        res.status(200).send(updatedUser);
      });
    } else {
      console.log('User not found in UpdateLocationController')
    }
  })
};

exports.getNearbyResponders = function (req, res) {
  const currentLocation = req.body.location;
  // console.log("currentLocation in getNearBy Responders", currentLocation);
  db
  .query(`select "id", "fullName", "organization", "currentLocation", "mobility" from "dynamicResponders" WHERE ST_DWithin(geometry, ST_MakePoint(${currentLocation[0]}, ${currentLocation[1]})::geography, ${radius}) AND available = TRUE UNION select "id", "fullName", "organization", "location", "mobility" from "staticResponderIndividuals" WHERE ST_DWithin(geometry, ST_MakePoint(${currentLocation[0]}, ${currentLocation[1]})::geography, ${radius})
    `)
  .then((results) => {
    res.send(results[0]);
  }).catch((err) => {
    console.error(err, ' on line 116');
    res.sendStatus(500);
  });
};

exports.animateResponders = function (req, res) {
  const currentLocation = req.body.location;
  // console.log('currentLocation ', currentLocation);
  dynamicResponder.findAll({})
  .then((responders) => {
    responders.map((responder) => {
      console.log("geometry is ", responder.geometry);
      console.log("typoe of currentlocation is ", typeof responder.currentLocation[0]);
      responder.currentLocation[0] += LATITUDE_DELTA / 2;
      responder.currentLocation[1] += LONGITUDE_DELTA / 2;
      responder.geometry.coordinates[0] +=  LATITUDE_DELTA / 2;
      responder.geometry.coordinates[1] += LONGITUDE_DELTA / 2;
      
      responder.update({
        currentLocation: responder.currentLocation,
        geometry: responder.geometry,
      });
    });
  })
  .then(() => {
    dynamicResponder.findAll({})
    .then((results) => {
      console.log(results);
      res.send(results);
    }).catch((err) => {
      console.error(err, ' on line 116');
      res.sendStatus(500);
    });
  }); //find again and return?
};

exports.addBeacon = function (req, res) {
  beacon.create({
    currentLocation: [req.body.latitude, req.body.longitude],
  }).then((beacon) => {
    console.log('Beacon Created');
    res.status(200).send(beacon);
  }).catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });
};

exports.deleteBeacon = function (req, res) {
  console.log(req.body);
  beacon.findOne({ where: { currentLocation: [req.body.latitude, req.body.longitude] } })
  .then((beacon) => {
    return beacon.destroy();
  })
  .then(() => {
    res.status(200).send('Beacon Destroyed');
  });
};

exports.switchAvailability = function (req, res) {
  console.log("Req.boyd is in swtichAvailability is ", req.body);
  dynamicResponder.update({ available: req.body[0] }, { where: { id: req.body[1] } })
  .then(() => {
    res.status(200).send('Availability Switched');
  });
};
