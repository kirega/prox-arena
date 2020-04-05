var { user } = require('../db/db');

exports.allUsers = (req, res, next) => {
    user.findAll()
        .then(
            (user) => {
                return res.json(user);
            }
        )
        .catch(next);
}

exports.createUser = async (req, res, next) => {
    var { firstName, lastName, userName } = req.body;
    var result = await user.create({
        firstName,
        lastName,
        userName
    });
    res.json(result);
}
