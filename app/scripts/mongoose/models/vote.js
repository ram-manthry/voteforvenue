var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var VoteSchema = new Schema({
    addedBy: { type: String, required: true }
    , eventId: { type: String, required: true }
    , placeId: { type: String, required: true }
    , sessionId: { type: String, required: false }
    , createdOn: { type: Date, default: Date.now }
    , ip: { type: String, required: true }
    , user: { type:Object, required: true }
});

module.exports = mongoose.model('Votes', VoteSchema);
