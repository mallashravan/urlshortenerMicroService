'use strict';

var express = require('express');
var mongo = require('mongodb');
var bodyParser = require('body-parser');
var cors = require('cors');
var dns = require('dns');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://malla_shravan:08121989@cluster0-shgf3.mongodb.net/test?retryWrites=true&w=majority';


// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
console.log(process.env.MONGOLAB_URI);
app.use(cors());
/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyParser.urlencoded());
app.use('/public', express.static(process.cwd() + '/public'));

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
    var dbo = db.db("mydb");
dbo.createCollection("urls", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    dbo.close();
  });
  db.close();
});
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
  //console.log(payload);
  let url = payload.url.replace(/(^\w+:|^)\/\//, '');
  
  dns.lookup(payload.url, (err, address, family) => {
    if(err)
      {
        res.json({"error":"invalid URL"});
      }
    else
      {
        
      }
});
});
app.listen(port, function () {
  console.log('Node.js listening ...');
});


