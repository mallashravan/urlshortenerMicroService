const Url = require('../models/url-model');
const urlParser = require('url');
var dns = require('dns');

getShortUrl = function (req, res) {
    console.log(req.params);
    var short_url = req.params;
    Url.findOne(req.params, function (err, data) {
        if (err) {
            res.json({ "error": "invalid URL" });
        }
        console.log(data.original_url);
        res.redirect(data.original_url);
    });
};

createShortUrl = function (req, res) {
    var payload = req.body;
    var original_url = payload.url;
    const parsedUrl = urlParser.parse(original_url);
    dns.lookup(parsedUrl.hostname, (err, address, family) => {
        if (err) {
            console.log("invalid url");
            res.json({ "error": "invalid URL" });
        }
        else {
            Url.findOne({ 'original_url': original_url }, function (err, data) {
                if (err || !data) {
                    var urlObj = new Url({ original_url: original_url });
                    console.log('urlObj=' + urlObj);
                    urlObj.save(function (err, data) {
                        if (err) {
                            console.log(err);
                            res.json(err);
                        }
                        console.log('saved');
                        console.log(data);
                        var result = { 'original_url': original_url, short_url: data.short_url };
                        res.json(result);
                    });
                }
                else {
                    var result = { original_url: data.original_url, short_url: data.short_url };
                    res.json(result);

                }

            });

        }
    });
};

getAllUrls = function (req, res) {
    console.log("Request received - Get All Urls" );
    Url.find({}, (err, data) => {
        if (err) {
            res.json(err);
        }
        res.json(data);
    });
};

deleteDirtyData = function (req, res) {
    Url.deleteMany({ "original_url": null }, (err, data) => {
        if (err) {
            res.json(err);
        }
        res.json(data);
    });
}
module.exports = {
    getShortUrl, createShortUrl, getAllUrls,deleteDirtyData
} 