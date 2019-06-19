const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Counter = require('./sequence-model');

let UrlSchema = new Schema({
    original_url: String,
    short_url: Number
});
UrlSchema.pre('save', function (next) {
    var doc = this;
    Counter.findByIdAndUpdate({ _id: 'urlId' }, { $inc: { seq: 1 } }, function (error, counter) {
        if (error)
            return next(error);
        doc.short_url = counter.seq;
        next();
    });
});
var Url = mongoose.model('Url', UrlSchema);
module.exports = Url;