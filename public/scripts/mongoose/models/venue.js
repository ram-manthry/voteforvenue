var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var venueSchema = new Schema({
    name: {type:String,required:true}
    , location: String
<<<<<<< HEAD:public/scripts/mongoose/models/venue.js
    , quantityOfVotes: Number
=======
    , quantityOfVotes: String
>>>>>>> origin/master:models/venue.js
    , eventId: {type:String,required:true}
});

module.exports = mongoose.model('Venue', venueSchema); 
