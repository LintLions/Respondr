const express = require('express');
const jwt = require('express-jwt');
const config = require('./config');

// Validate access_token
exports.check = jwt({
  secret: config.secret,
  audience: config.audience,
  issuer: config.issuer
});

// Check for scope
exports.scope = (scope) => {
  return function (req, res, next) {
    console.log(req.user);
    var has_scopes = req.user.scope === scope;
    console.log(has_scopes);
    if (!has_scopes) { 
        res.sendStatus(401); 
        return;
    }
    next();
  };
}

