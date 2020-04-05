"use strict";

const {
  Sequelize,
  DataTypes,
  Model
} = require('sequelize');

const sequelize = new Sequelize('teams', 'teamsAdmin', 'myPass', {
  dialect: 'sqlite',
  storage: '/api/team-battles'
});