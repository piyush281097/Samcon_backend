const http = require("http")
const express = require('express')
const app = express()
const server   = require('http').Server(app)
const bodyParser = require('body-parser');
require("./database").connect();
var cors = require('cors')

const routes = require('./routes/index.js');

app.use(bodyParser.urlencoded({ limit: "100mb",extended: true }));
app.use(bodyParser.json({limit: "100mb"}));

app.use(cors());

app.use('/', routes); 

app.use(function(err,req,res,next){
    //console.log(err);
    res.status(422).send({error: err.message});
});

module.exports = app;