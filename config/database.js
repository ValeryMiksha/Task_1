const Sequelize = require("sequelize");
module.exports = sequelize = new Sequelize("work", "postgres", "admin", {
    dialect: "postgres",
    host: "localhost"
});
