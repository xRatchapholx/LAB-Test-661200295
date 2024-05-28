const config = require("../config/db.js");

const dataType = require("sequelize");
const sequelize = new dataType(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect
  }
);

const db = {};

db.dataType = dataType;
db.sequelize = sequelize;


db.stdall = require("./stdall.model.js")(sequelize, dataType);
db.student = require("./student.model.js")(sequelize, dataType);
db.universities = require("./universities.model.js")(sequelize, dataType);

db.student.belongsToMany(db.universities, {
  through: "stdall",
  foreignKey: "studentId",
  onDelete: 'CASCADE'
});
db.universities.belongsToMany(db.student, {
  through: "stdall",
  foreignKey: "universitiesId",
  onDelete: 'CASCADE'
});

module.exports = db;