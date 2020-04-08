const { account } = require('../db/db');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
let jwtSecret =  "my-special-secret";

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
        res.status(400).send({errors: 'Invalid email or password'});
      } else {
        let passwordFields = user.password.split('$');
        let salt = passwordFields[0];
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        if (hash === passwordFields[1]) {
          req.body = {
            id: user.id,
            email: user.email,
            permission: user.permission
          };
          return next();
        } else {
          return res.status(400).send({ errors: [ 'Invalid email or password' ] });
        }
      }
    });
};
exports.login = async (req, res, next) => {
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

exports.validJWTNeeded = (req, res, next) => {
  if (req.headers['authorization']) {
    try {
      let authorization = req.headers['authorization'].split(' ');
      if (authorization[0] !== 'Bearer') {
        return res.status(401).send();
      } else {
        req.jwt = jwt.verify(authorization[1], jwtSecret);
        return next();
      }
    } catch (err) {
      return res.status(403).send();
    }
  } else {
    return res.status(401).send();
  }
};
