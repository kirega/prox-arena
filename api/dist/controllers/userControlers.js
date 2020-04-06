"use strict";

var {
  user,
  team
} = require('../db/db');

exports.allUsers = (req, res, next) => {
  user.findAll({
    include: [{
      model: team
    }],
    order: [['her', 'DESC']]
  }).then(user => {
    return res.json(user);
  }).catch(next);
};

exports.createUser = async (req, res, next) => {
  var {
    firstName,
    lastName,
    userName,
    teamId
  } = req.body;

  try {
    var result = await user.create({
      firstName,
      lastName,
      userName,
      teamId
    });
    res.json(result);
  } catch (e) {
    res.status(400).json({
      error: "error occured"
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  var userId = req.params.id;

  try {
    var response = await user.destroy({
      where: {
        id: userId
      }
    });
    res.status(200).json({
      success: "success"
    });
  } catch (e) {
    res.status(400).json(e);
  }
};