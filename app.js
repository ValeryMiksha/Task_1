const express = require("express")
/*const PORT = 8080;*/
const app = express();
const db = require("./config/database")
const table_1_model = require("./models/model")
const table_2_model = require("./models/tb2_model")
const temporal = require("./models/temporal")
const {response} = require("express");
const {where} = require("sequelize");
const jsonParser = express.json();


sequelize.sync().then(()=>{
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
}).catch(err=>console.log(err));


app.set("view engine", "hbs")
app.post('/add', jsonParser, (req, res) => {
    table_1_model.findOne({where: {id: req.body.id}}).then((data) => {
        let key = req.body.level;
        let keys = Object.keys(data.dataValues)
        let index = keys.indexOf(key);
        let element = {
            value: data.id,
            label: data[keys[index + 1]],
            ifLeaf: !!data[keys[index + 2]] && keys[index + 2]!== "createdAt" && keys[index + 2] !== "updatedAt"
        }
        res.json(element)
    })
})




app.post("/delete_tb2",jsonParser, (req, res) => {
    table_2_model.destroy({where: {id: req.body.id}}).then(() => {
        res.sendStatus(200);
    }).catch(() => {
        res.sendStatus(400);
    })
})
app.post("/add_tb2", jsonParser, (req, res) => {
    table_2_model.create({info: req.body.info}).then((data) => {
        res.json(data)
    })
})
app.post('/change_tb2', jsonParser, (req, res) => {

    table_2_model.update({info: req.body.info}, {where: {id: req.body.id}}).then(() => {
        res.sendStatus(200)
    }).catch(() => {
        res.sendStatus(400)
    })
})
app.get("/", function (_, response) {
    let array;
    table_1_model.findAll({raw: true}).then( (data) => {
        array = data.map((element) => {
            const obj = {
                value: element.id,
                label: element.level_1,
                ifLeaf: element.level_2 != null
            }
            return obj;
        })
    }).catch(() => response.send("DB Error"))
    table_2_model.findAll({raw: true}).then((data) => {
        response.render("content.hbs", {
            item: array,
            tb2: data
        })
    })
})
/*
app.listen(PORT)*/
