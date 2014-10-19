var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var venueSchema = new Schema({
    name: {type:String,required:true}
    , location: String
    , quantityOfVotes: String
    , eventId: {type:String,required:true}
});

var Venue = mongoose.model('Venue', venueSchema);
module.exports = Venue;