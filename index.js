const authentication = require('./controller/user')
const bodyParser = require('body-parser');
const routes = require('./routes/items');
const passport = require('passport')
const express = require('express');
const logger = require('morgan');
require('dotenv').config();
const port = process.env.PORT;
const cors = require('cors');
const app = express();
require('./config/db');
require('./auth/auth');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use('/', (req,res)=>{
//     res.send("Hello World")
// })

app.use('/api', routes);
app.use('/auth', authentication);

app.listen(port, () => console.log(`Conection established on port ${port}`));
