var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var eventSchema = new Schema({
    title: { type:String,required:true }
    , eventDate: { type: Date,required:true }
    , votingEndsOn: { type: Date, required:true }
    , friends: { type:Object, required:false }
    , eventImage: { type:String, required:false }
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
