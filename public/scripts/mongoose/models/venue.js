var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var venueSchema = new Schema({
    name: {type:String,required:true}
    , location: String
    , quantityOfVotes: Number
    , eventId: {type:String,required:true}
});

module.exports = mongoose.model('Venue', venueSchema); 