const Sequelize = require("sequelize")
const db = require("../config/database")

module.exports = db.define("tb2", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    info: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})