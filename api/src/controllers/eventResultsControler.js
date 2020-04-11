var { EventResult, User } = require('../../models/index');
const superagent = require('superagent');

exports.allEventsResults = (req, res, next) => {
  EventResult.findAll({
    order: [['createdAt', 'DESC']]
  })
    .then(
      (event) => {
        return res.json(event);
      }
    )
    .catch(next);
};

exports.resultsPerEvent = (req, res, next) => {
  let eventId = req.params.eventId;
  console.log(eventId);
  EventResult.findAll({
    where: { EventId: eventId },
    include: [{ model: User }],
    order: [['result', 'DESC']]
  }).then(event => {
    return res.status(200).json(event);
  })
};

exports.createEventResult = async (req, res, next) => {
  var { result, UserId, EventId } = req.body;

  try {
    var createResult = await EventResult.create({
      result,
      UserId,
      EventId
    });
    console.log(createResult);
    res.json(createResult);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Unable to create result at this time" });
  }

};

exports.deleteEventResult = async (req, res, next) => {
  var EventId = req.params.eventId;
  var UserId = req.params.userId;
  try {
    var response = await EventResult.destroy({ where: { EventId, UserId } });
    res.status(200).json({ success: "success" });
  } catch (e) {
    res.status(400).json(e);
  }

};

exports.updateEventResult = async (req, res, next) => {
  //   var eventId = req.params.id;
  var { UserId, EventId, result } = req.body;
  try {
    var eventInstance = await EventResult.findOne({ where: { EventId, UserId } });
    eventInstance.update(
      {
        result
      }
    );
    res.status(200).json({ success: "success" });
  } catch (e) {
    res.status(400).json(e);
  }
};