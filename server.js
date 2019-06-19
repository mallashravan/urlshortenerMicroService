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
let counterObj = new counter({_id:"urlId",seq:0});
counterObj.save(function(err,data){
  console.log('counter initialised');
});
  var UrlSchema = new Schema({
     original_url: String,
     short_url: Number 
  });
UrlSchema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'urlId'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.short_url = counter.seq;
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

app.get("/api/shorturl/:short_url",function(req,res)
       {
  console.log(req.params);
  var short_url = req.params;
  Url.findOne(req.params,function (err, data) {
    if(err)
      {
        res.json({"error":"invalid URL"});
      }
    console.log(data.original_url);
      res.redirect(data.original_url);
  });
});
app.post("/api/shorturl/new",function(req,res)
        {
    var payload = req.body;
    var original_url = payload.url;
  console.log(payload);
  let url = payload.url.replace(/(^\w+:|^)\/\//, '');
  
  dns.lookup(url, (err, address, family) => {
    if(err)
      {
        console.log("invalid url");
        res.json({"error":"invalid URL"});
      }
    else
      {
         Url.findOne({original_url:original_url},function (err, data) {
    if(err)
      {
         var urlObj = new Url({original_url:original_url});
  console.log('urlObj=' + urlObj);
  urlObj.save(function(err,data)
{
    console.log('saved');
    console.log(data);
    var result = {original_url : data.original_url,short_url:data.short_url};
    res.json(result);
  });
      }
      else
        {
             var result = {original_url : data.original_url,short_url:data.short_url};
    res.json(result);

        }
    
  });

      }
});
});
app.listen(port, function () {
  console.log('Node.js listening ...');
});

