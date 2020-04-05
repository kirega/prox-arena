var express = require('express');
var router = express.Router();
var userControler =  require('../controllers/userControlers');

/* GET users listing. */
router.get('/', userControler.allUsers);


router.post('/', function(req,res,next){
  res.json("Success");
});


module.exports = router;
