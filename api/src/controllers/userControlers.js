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
    try {
        var result = await user.create({
            firstName,
            lastName,
            userName
        });
        res.json(result);
    } catch(e) {
        res.status(400).json({error: "error occured"})
    }

}
