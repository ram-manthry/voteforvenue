var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var placeSchema = new Schema({
    name: { type:String,required:true }
    , location: { type: String, required: true }
    , mapUrl: { type: String, required: false }
    , eventId: { type: String, required: true }
    , user: { type: Object, required: false }
    , createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Places', placeSchema); 