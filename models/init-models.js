var DataTypes = require("sequelize").DataTypes;
var _file_chunks = require("./file_chunks");
var _files = require("./files");
var _messages = require("./messages");
var _users = require("./users");

function initModels(sequelize) {
  var file_chunks = _file_chunks(sequelize, DataTypes);
  var files = _files(sequelize, DataTypes);
  var messages = _messages(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  file_chunks.belongsTo(files, { as: "file", foreignKey: "file_id"});
  files.hasMany(file_chunks, { as: "file_chunks", foreignKey: "file_id"});
  files.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(files, { as: "files", foreignKey: "created_by"});
  messages.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(messages, { as: "messages", foreignKey: "created_by"});

  return {
    file_chunks,
    files,
    messages,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
