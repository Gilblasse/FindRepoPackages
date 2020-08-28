"use strict";

var express = require("express");

var bodyParser = require("bodyParser"); // set up express app


var app = express();
var port = process.env.port || 4000;
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
    grettings: "Hello World"
  });
}); // initialize routes

app.use('/api/v1', require('./routes/api')); // listen for requests

app.listen(port, function () {
  console.log("Now listening for requests on - http://localhost:".concat(port, "/"));
});
module.exports = app;
//# sourceMappingURL=index.js.map