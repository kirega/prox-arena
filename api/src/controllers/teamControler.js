var { team } = require('../db/db');

exports.allTeams = (req, res, next) => {
    team.findAll({
      order: [['totalElos', 'DESC']]
    })
        .then(
            (team) => {
                return res.json(team);
            }
        )
        .catch(next);
};

exports.createTeam = async (req, res, next) => {
    // console.log(req.body);
    var { teamName, totalElos } = req.body;

    console.log(teamName);
    try {
        var result = await team.create({
            teamName,
            totalElos: 0
        });
        res.json(result);
    } catch(e){
        // console.log(e);
        res.status(500).json(e);
    }

};

