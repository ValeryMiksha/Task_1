const Sequelize = require("sequelize")
const Temopral = require("sequelize-temporal")
const db = require("../config/database")
const tdModel = require("../models/tb2_model")
const temporal = Temopral(tdModel,db,{blocking:true,full: false})
temporal.sequelize.sync({force: false, hooks:true, benchmark: true})
module.exports = temporal;