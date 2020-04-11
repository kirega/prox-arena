var { Event } = require('../../models/index');
const superagent = require('superagent');

exports.allEvents = (req, res, next) => {
  Event.findAll({
    order: [ [ 'createdAt', 'DESC' ] ]
  })
    .then(
      (event) => {
        return res.json(event);
      }
    )
    .catch(next);
};

exports.createEvent = async (req, res, next) => {
  var { name, dateOfEvent } = req.body;
  
  try {
    var result = await Event.create({
      name,
      dateOfEvent
    });
    res.json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Unable to create event at this time" });
  }

};

exports.deleteEvent = async (req, res, next) => {
  var eventId = req.params.eventId;
  try {
    var response = await Event.destroy({ where: { id: eventId } });
    res.status(200).json({ success: "success" });
  } catch (e) {
    res.status(400).json(e);
  }

};

exports.updateEvent = async(req, res, next) => {
  var eventId = req.params.eventId;
  var {name, dateOfEvent} = req.body;
  try {
    var eventInstance = await Event.findOne({ where: { id: userId } });
    eventInstance.update(
        {
            name,
            dateOfEvent
        }
    );
    res.status(200).json({ success: "success" });
  } catch (e) {
    res.status(400).json(e);
  }
};