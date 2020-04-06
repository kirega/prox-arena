var { team } = require('../db/db');

exports.allTeams = (req, res, next) => {
    team.findAll()
        .then(
            (user) => {
                return res.json(user);
            }
        )
        .catch(next);
};

exports.createTeam = async (req, res, next) => {
    var { teamName, totalElos } = req.body;
    var result = await user.create({
        teamName
    });
    res.json(result);
};
