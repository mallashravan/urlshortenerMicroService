'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var dns = require('dns');
var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
console.log(process.env.MONGOLAB_URI);
mongoose.connect('mongodb+srv://malla_shravan:08121989@cluster0-shgf3.mongodb.net/test?retryWrites=true&w=majority');
app.use(cors());
/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyParser.urlencoded());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});
  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.post("/api/shorturl/new",function(req,res)
        {
    var payload = req.body;
  dns.lookup(payload.url,function(err,data){
     res.send(data);
  });
});
app.listen(port, function () {
  console.log('Node.js listening ...');
});
