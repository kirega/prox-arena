var express = require('express');
var router = express.Router();
var teamControlers = require('../controllers/teamControler'); 
/* GET users listing. */
router.get('/', teamControlers.allTeams);
router.post('/', teamControlers.createTeam);

module.exports = router;
