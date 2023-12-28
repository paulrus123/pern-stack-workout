var DataTypes = require("sequelize").DataTypes;
var _excercise_definitions = require("./excercise_definitions");
var _sessions = require("./sessions");
var _single_set = require("./single_set");
var _users = require("./users");

function initModels(sequelize) {
  var excercise_definitions = _excercise_definitions(sequelize, DataTypes);
  var sessions = _sessions(sequelize, DataTypes);
  var single_set = _single_set(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);


  return {
    excercise_definitions,
    sessions,
    single_set,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
