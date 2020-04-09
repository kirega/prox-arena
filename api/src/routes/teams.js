var express = require('express');
var router = express.Router();
var teamControlers = require('../controllers/teamControler');
/* GET users listing. */
router.get('/', teamControlers.allTeams);
// router.get('/tally', teamControlers.teamTallies);
router.post('/', teamControlers.createTeam);
router.get('/detail/:id', teamControlers.teamDetail);
router.delete('/:id', teamControlers.deleteTeam);


module.exports = router;
