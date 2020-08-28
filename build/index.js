"use strict";

var express = require('express');

var bodyParser = require('body-parser'); // import express from 'express'
// import bodyParser from 'body-parser'
// import router from './routes/api'
// set up express app


var app = express();
var PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});
app.get('/', function (req, res) {
  res.send({
    grettings: "Hello"
  });
}); // initialize routes

app.use('/api/v1', require('./routes/api.js')); // listen for requests

app.listen(PORT, function () {
  console.log("Now listening for requests on port - ".concat(PORT));
});
module.exports = app;
//# sourceMappingURL=index.js.map