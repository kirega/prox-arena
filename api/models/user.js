'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    her: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    paymentStatus: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.team);
  };
  return User;
};