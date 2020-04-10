'use strict';
module.exports = (sequelize, DataTypes) => {
  const team = sequelize.define('team', {
    teamName: DataTypes.STRING,
    totalElos: DataTypes.INTEGER
  }, {});
  team.associate = function(models) {
    // associations can be defined here
    team.has(models.user);
  };
  return team;
};