var express = require('express');
var router = express.Router();
var teamControlers = require('../controllers/teamControler'); 
/* GET users listing. */
router.get('/', teamControlers.allTeams);

module.exports = router;
