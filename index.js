const express = require('express');
const app = express();
const Port = 3002;

app.use('/', function(req,res){
    res.send('hello Word!')
})

app.listen(Port, () => console.log(`Conection established on port ${Port}`));