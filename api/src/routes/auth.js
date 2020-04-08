var express = require('express');
var router = express.Router();
var authControler = require('../controllers/authControler');

router.get('/signUp', authControler.signUp);
