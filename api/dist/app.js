"use strict";

var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');

var cors = require('cors');

var cron = require("node-cron"); // in app imports


var users = require('./routes/users');

var teams = require('./routes/teams');

var cronTask = require('./db/update');

var app = express();
app.use((req, res, next) => {
  req.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser()); // Routes

app.use('/api/v1/users', users);
app.use('/api/v1/teams', teams); // Cronjobs for updating HER

cron.schedule("* 4 * * *", function () {
  cronTask.updateUsers();
  console.log("running a task every minute");
});
cron.schedule("* 4 * * *", function () {
  cronTask.teamTallies();
  console.log("running team table update");
});
module.exports = app;