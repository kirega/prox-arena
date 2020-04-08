const { account } = require('../db/db');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.signUp = async (req, res, next) => {
  let salt = crypto.randomBytes(16).toString('base64');
  let hash = crypto.createHmac('sha512', salt)
    .update(req.body.password)
    .digest("base64");
  req.body.password = salt + "$" + hash;
  try {
    const accountDetails = await account.create(req.body);
    res.json(accountDetails)
  } catch (e) {
    // console.log(e);
    res.status(400).json(e);
  }
}
exports.isPasswordAndUserMatch = (req, res, next) => {
  account.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((user) => {
      if (!user) {
        res.status(404).send({});
      } else {
        let passwordFields = user.password.split('$');
        let salt = passwordFields[0];
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        if (hash === passwordFields[1]) {
          req.body = {
            id: user.id,
            email: user.email
          };
          return next();
        } else {
          return res.status(400).send({ errors: [ 'Invalid email or password' ] });
        }
      }
    });
};
exports.login = async (req, res, next) => {
  let jwtSecret =  "my-special-secret";
  try {
    let refreshId = req.body.userId + jwtSecret;
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
    req.body.refreshKey = salt;
    let token = jwt.sign(req.body, jwtSecret);
    let b = new Buffer(hash);
    let refresh_token = b.toString('base64');
    res.status(201).send({ accessToken: token, refreshToken: refresh_token });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
}
