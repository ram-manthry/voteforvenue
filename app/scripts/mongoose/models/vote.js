var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var VoteSchema = new Schema({
    addedBy: { type: String, required: true }
    , eventId: { type: String, required: true }
    , placeId: { type: String, required: true }
    , sessionId: { type: String, required: true }
    , createdOn: { type: Date, default: Date.now }
    , ip: { type: String, required: false }
    , user: { type:Object, required: false }
});

module.exports = mongoose.model('Vote', VoteSchema);
