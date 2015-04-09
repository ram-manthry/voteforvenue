var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var eventSchema = new Schema({
    title: { type:String,required:true }
    , eventDate: { type: Date,required:true }
    , votingEndsOn: { type: Date, required:true }
    , friends: { type:Object, required:false }
    , eventImage: { type: String, required: false }
    , user: { type: Object, required: false }
    , createdOn: { type: Date, default: Date.now }
});

var Event = mongoose.model('Events', eventSchema);

module.exports = Event;
