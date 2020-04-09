var { team, user } = require('../db/db');

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

exports.teamDetail = async (req, res, next) => {
  const teamId = req.params.id;
  try {
    const result = await user.findAll({
      where: { teamId },
      include: [
        {model: team}
      ]
    });
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json(e);
  }
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
    } catch (e) {
        // console.log(e);
        res.status(400).json(e);
    }

};

