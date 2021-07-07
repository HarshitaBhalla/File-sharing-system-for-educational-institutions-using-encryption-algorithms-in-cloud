'use strict';

const Sequelize = require('sequelize');
const env ='development';
const config = require('../config')[env];
const initModels = require("./init-models");

const db = {};
let sequelize;

if (config) {
  sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, config.db);
} else {
  throw new Error('DB Configuration file missing');
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.models = initModels(db.sequelize);

module.exports = db;
