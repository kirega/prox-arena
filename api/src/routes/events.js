var express = require('express');
var router = express.Router();
var eventControler =  require('../controllers/eventControler');

/* GET users listing. */
router.get('/', eventControler.allEvents);
router.post('/', eventControler.createEvent);
router.put('/updatePayment/:id', eventControler.updatePayment);

router.put('/update', eventControler.updateEvent);

router.delete('/:eventId', eventControler.deleteEvent);

module.exports = router;
