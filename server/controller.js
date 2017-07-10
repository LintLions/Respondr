const dynamicAngel = require('../db/models/dynamicAngels.js');
const _ = require('lodash');
const config = require('./config');
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

  dynamicAngel.findOne({where: userScheme.userSearch}).then((user) => {
    if (user){
      return res.status(400).send({error: "A user with that username already exists"});
    } else{
//no static users plz
      dynamicAngel.create({
        firstName: req.body.fName,
        lastName: req.body.lName,
        phone: req.body.phone,
        organization: req.body.organization,
        email: req.body.email,
        password: dynamicAngel.generateHash(req.body.password),
        public: req.body.public,
        static: req.body.static,
        fullName: `${req.body.fName} ${req.body.lName}`
      }).then(({email})=>{
        res.status(201).send({
          id_token: createIdToken(email),
          access_token: createAccessToken()
        });
      }).catch((err)=>{
        console.error(err + " on line 81");
        res.sendStatus(500)
      })
    }
  }).catch((err)=>{
    console.log(err);
    res.sendStatus(500);
  })
}

exports.addSession =  function(req, res) { //add session

  var userScheme = getUserScheme(req);

  if (!userScheme.username || !req.body.password) {
    return res.status(400).send({error: "You must send the username and the password"});
  }

  dynamicAngel.findOne({where: userScheme.userSearch}).then((user) => {
    if (!user) {
      return res.status(401).send({error: "The username is incorrect"});
    } else if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send({error: "The username and password don't match"});
    } else {   
      res.status(201).send({
        id_token: createIdToken(user.email),
        access_token: createAccessToken()
      });
    }
  }) .catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
}

exports.getUsers = function(req, res) {
  dynamicAngel.findAll({})
  .then((results) => {
    console.log(results);
    res.send(results);
  }).catch((err) => {
    console.error( err + " on line 116")
    res.sendStatus(500)
  })
};