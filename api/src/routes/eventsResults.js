var express = require('express');
var router = express.Router();
var eventResultsControler =  require('../controllers/eventResultsControler');

/* GET users listing. */
// router.get('/', eventResultsControler.all);
router.put('/updatePayment/:id', userControler.updatePayment);

router.put('/update', eventResultsControler.updateEvent);

router.delete('/:userId/:eventId', eventResultsControler.deleteEventResult);

module.exports = router;
