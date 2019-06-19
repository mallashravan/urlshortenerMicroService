const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Sequence = new Schema(
    {
        _id: {type: String, required: true},
        seq: { type: Number, default: 20 }
    }
);
const Counter = mongoose.model('sequence', Sequence);
let counter = new Counter({_id:"urlId",seq:0});
counter.save(function(err,data){
    console.log('counter initialised');
  });
module.exports = Counter;