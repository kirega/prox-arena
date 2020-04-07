var { user, team } = require('../db/db');
const superagent = require('superagent');

exports.allUsers = (req, res, next) => {
  user.findAll({
    include: [ { model: team } ],
    order: [ [ 'her', 'DESC' ] ]
  })
    .then(
      (user) => {
        return res.json(user);
      }
    )
    .catch(next);
};

exports.createUser = async (req, res, next) => {
  var { firstName, lastName, userName, teamId } = req.body;
  //Confirm that the userName actually exists and set the her
  var url = `https://lichess.org/@/${userName}/perf/blitz`;
  let userData;
  try {
    let res = await superagent
      .get(url)
      .set('accept', 'application/vnd.lichess.v2+json');
    userData = JSON.parse(res.text);
  } catch (e) {
    console.log("error occured", e);
    res.status(400).json({ error: "UserName does not exist on Lichess" })
  }
  const her = userData.stat.highest.int;
  try {
    var result = await user.create({
      firstName,
      lastName,
      userName,
      teamId,
      her
    });
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: "Unable to create user at this time" })
  }

};

exports.deleteUser = async (req, res, next) => {
  var userId = req.params.id;
  try {
    var response = await user.destroy({ where: { id: userId } });
    res.status(200).json({ success: "success" });
  } catch (e) {
    res.status(400).json(e);
  }


}
