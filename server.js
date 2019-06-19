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
var Schema = mongoose.Schema;

var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
var counter = mongoose.model('counter', CounterSchema);

  var UrlSchema = new Schema({
     original_url: String,
     short_url: Number 
  });
UrlSchema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.testvalue = counter.seq;
        next();
    });
});
var Url = mongoose.model('Url', UrlSchema);

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
  
  dns.lookup(url, (err, address, family) => {
    if(err)
      {
        res.json({"error":"invalid URL"});
      }
    else
      {
 var urlObj = new Url({"original_url":"www.google.com","short_url":1});
  urlObj.save(function(err,data)
{
    console.log('saved');
    res.json(data);
  });
      }
});
});
app.listen(port, function () {
  console.log('Node.js listening ...');
});

