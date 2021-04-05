var express = require('express');
var app = express();
var mongoose = require('mongoose');
var userRoute = require('./routes/users.route');
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors())
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/test',{useNewUrlParser:true},() =>{
   console.log('Connected to database')
})
app.use('/api',userRoute);
app.listen(4000);