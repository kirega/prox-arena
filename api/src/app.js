var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var cron = require("node-cron");
const morgan = require('morgan');

// in app imports
var users = require('./routes/users');
var teams = require('./routes/teams');
var events = require('./routes/events');
var eventResults = require('./routes/eventsResults');
var auth = require('./routes/auth');
var cronTask = require('./db/update');

const app = express();


app.use((req, res, next) => {
    req.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(morgan('combined'));

// Routes
app.use('/api/v1/users', users);
app.use('/api/v1/teams', teams);
app.use('/api/v1/events', events);
app.use('/api/v1/results', eventResults);
app.use('/api/v1/auth', auth);

// Cronjobs for updating HER
cron.schedule("* 4 * * * *", function() {
    cronTask.updateUsers();
    console.log("running a task every minute");
  });
cron.schedule("59 * * * * *", function() {
  cronTask.teamTallies();
  console.log("running team table update");
});
module.exports = app;
