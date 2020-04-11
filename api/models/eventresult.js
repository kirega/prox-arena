'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventResult = sequelize.define('EventResult', {
    result: DataTypes.INTEGER
  }, {});
  EventResult.associate = function(models) {
    // associations can be defined here
    EventResult.belongsTo(models.User);
    EventResult.belongsTo(models.Event);
  };
  return EventResult;
};