var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var EventSchema = new Schema({
    title      : String
    ,eventDate : String
    ,votingEndsOn : String
});

module.exports = mongoose.model('events', EventSchema);
