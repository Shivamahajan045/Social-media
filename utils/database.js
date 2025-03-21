const Sequelize = require("sequelize");
const sequelize = new Sequelize("socialmedia", "root", "Shivu@123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
