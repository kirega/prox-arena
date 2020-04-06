var express = require('express');
var router = express.Router();
var userControler =  require('../controllers/userControlers');

/* GET users listing. */
router.get('/', userControler.allUsers);


router.post('/', userControler.createUser);

router.delete('/:id', userControler.deleteUser);

module.exports = router;
