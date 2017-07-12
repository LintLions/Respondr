const express = require('express');
const jwt = require('express-jwt');
const config = require('../config');

// Validate access_token
exports.check = jwt({
  secret: config.secret,
  aud: config.audience,
  iss: config.issuer
});

// Check for scope
exports.restrict = (scope) => {
  return function (req, res, next) {
    console.log(req.user);
    if (!req.user) { 
        res.sendStatus(401); 
        return;
    }
    next();
  };
}

