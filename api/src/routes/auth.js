var express = require('express');
var router = express.Router();
var authControler = require('../controllers/authControler');

router.post('/signUp', authControler.signUp);
router.post('/login', [
  authControler.isPasswordAndUserMatch,
  authControler.login]);


module.exports = router;
