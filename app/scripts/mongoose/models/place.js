var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var placeSchema = new Schema({
    name: { type:String,required:true }
    , location: { type: String, required: true }
    , mapUrl: { type: String, required: true }
    , eventId: { type: String, required: true }
    , createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Place', placeSchema); 