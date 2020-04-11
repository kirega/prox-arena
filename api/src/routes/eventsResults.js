var express = require('express');
var router = express.Router();
var eventResultsControler =  require('../controllers/eventResultsControler');

/* GET users listing. */
router.get('/:eventId', eventResultsControler.resultsPerEvent);
router.get('/', eventResultsControler.allEventsResults);
router.put('/update', eventResultsControler.updateEventResult);

router.post('/', eventResultsControler.createEventResult);

router.delete('/:userId/:eventId', eventResultsControler.deleteEventResult);

module.exports = router;
