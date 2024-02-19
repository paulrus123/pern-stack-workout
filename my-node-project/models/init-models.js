var DataTypes = require("sequelize").DataTypes;
var _excercise_definitions = require("./excercise_definitions");
var _sessions = require("./sessions");
var _single_set = require("./single_set");
var _users = require("./users");

function initExcerciseModels(sequelize) {
  var excercise_definitions = _excercise_definitions(sequelize, DataTypes);
  var sessions = _sessions(sequelize, DataTypes);
  var single_set = _single_set(sequelize, DataTypes);

  return {
    excercise_definitions,
    sessions,
    single_set,
  };
}

function initUsersModel(sequelize) {
  var users = _users(sequelize, DataTypes);
  return {
    users
  };
}

module.exports.initExcerciseModels = initExcerciseModels;
module.exports.initUsersModel = initUsersModel;
