const dynamicResponder = require('../db/models/dynamicResponders.js');
const beacon = require('../db/models/beacons.js');
const _ = require('lodash');
const config = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

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
  
  var username;
  var type;
  var userSearch = {};

  // The POST contains a username and not an email
  if(req.body.username) {
    username = req.body.username;
    type = 'username';
    userSearch = { username: username };
  }
  // The POST contains an email and not an username
  else if(req.body.email) {
    username = req.body.email;
    type = 'email';
    userSearch = { email: username };
  }

  return {
    username: username,
    type: type,
    userSearch: userSearch
  }
}

exports.addUser = function(req, res) { //add user
  
  var userScheme = getUserScheme(req);  

  if (!userScheme.username || !req.body.password) {
    return res.status(400).send({error: "You must send the username and the password"});
  }

  dynamicResponder.findOne({where: userScheme.userSearch}).then((user) => {
    if (user) {
      return res.status(400).send({error: "A user with that username already exists"});
    }
// no static users plz
    dynamicResponder.create({
      firstName: req.body.fName,
      lastName: req.body.lName,
      phone: req.body.phone,
      organization: req.body.organization,
      email: req.body.email,
      password: dynamicResponder.generateHash(req.body.password),
      public: req.body.public,
      static: req.body.static,
      fullName: `${req.body.fName} ${req.body.lName}`,
      token: createIdToken(req.body.email),
      socket: req.body.socket,
    }).then((newUser) => {
      res.status(201).send({
        newUser,
        success: true,
        access_token: createAccessToken(),
      });
    }).catch((err) => {
      console.error(`ERROR during create dynamicResponder => addUser ${err}`);
      res.status(500).send({ error: 'umm, I asked the server to let you in, but it said nah' });
    });
  }).catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
}

exports.addSession =  function(req, res) { //add session

  var userScheme = getUserScheme(req);

  console.log("userScheme is ", userScheme);

  if (!userScheme.username || !req.body.password) {
    return res.status(400).send({error: "You must send the username and the password"});
  }

  dynamicResponder.findOne({where: userScheme.userSearch}).then((user) => {
    if (!user) {
      return res.status(401).send({error: "The username is incorrect"});
    } else if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send({error: "The username and password don't match"});
    } else {   
      res.status(201).send({
        user,
        id_token: createIdToken(user.email),
        access_token: createAccessToken()
      });
    }
  }) .catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
}

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

exports.getUsers = function(req, res) {
  dynamicResponder.findAll({})
  .then((results) => {
    console.log(results);
    res.send(results);
  }).catch((err) => {
    console.error( err + " on line 116")
    res.sendStatus(500)
  })
};

exports.addBeacon = function(req, res) {
  beacon.create({
    currentLocation: [req.body.latitude, req.body.longitude],
  }).then((beacon) => {
    console.log('Beacon Created')
    res.status(200).send(beacon)
  }).catch((err) => {
    console.error(err)
    res.sendStatus(500)
  })
};

exports.deleteBeacon = function (req, res) {
  console.log(req.body)
  beacon.findOne({where: {currentLocation:[req.body.latitude, req.body.longitude]}})
  .then(beacon => {
    return beacon.destroy()
  })
  .then(() => {
    res.status(200).send('Beacon Destroyed')
  })
}
