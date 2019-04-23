const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const passport = require('passport')
const Port = process.env.PORT;
require('./config/db');
require('./auth/auth');
require('dotenv').config;

app.use('/', function(req,res){
    res.send('hello Word!')
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(Port, () => console.log(`Conection established on port ${Port}`));