var { EventResult } = require('../../models/index');
const superagent = require('superagent');

// exports.allEvents = (req, res, next) => {
//     EventResult.findAll({
//     order: [ [ 'createdAt', 'DESC' ] ]
//   })
//     .then(
//       (event) => {
//         return res.json(event);
//       }
//     )
//     .catch(next);
// };

exports.createEventResult = async (req, res, next) => {
  var { result, userId, eventId } = req.body;
  
  try {
    var createResult = await EventResult.create({
      name,
      userId,
      eventId
    });
    res.json(createResult);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Unable to create result at this time" });
  }

};

exports.deleteEventResult = async (req, res, next) => {
  var eventId = req.params.eventId;
  var userId = req.params.userId;
  try {
    var response = await EventResult.destroy({ where: { eventId, userId } });
    res.status(200).json({ success: "success" });
  } catch (e) {
    res.status(400).json(e);
  }

};

exports.updateEventResult = async(req, res, next) => {
//   var eventId = req.params.id;
  var {userId, eventId, result} = req.body;
  try {
    var eventInstance = await EventResult.findOne({ where: { eventId,userId } });
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