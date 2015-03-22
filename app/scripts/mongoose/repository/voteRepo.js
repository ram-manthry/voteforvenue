var mongoose        = require('mongoose');
var Vote            = require('../models/vote');
var GenericResponse = require('../../common/sharedFunc');


exports.getVotes = function (req, res) {
    var genericResponse = new GenericResponse();
    Vote.find({ "eventId": req.params.eventId }).find(function (err, votes) {
        if (err) {
            res.send(genericResponse.errorResult);
        }
        genericResponse.successResult.votes = votes;
        res.send(genericResponse.successResult);
    });
};

exports.addVote = function (req, res) {
    var genericResponse = new GenericResponse();
    var vote = new Vote({
        addedBy: "noUser"
        , eventId: req.body.eventId
        , placeId: req.body.placeId
        , sessionId: 0
    });

    vote.save(function (err, vote) {
        if (err) {
            console.error(err);
            genericResponse.errorResult.message = 'Sorry, there was an error adding the vote. Error: ' + err;
            res.send(genericResponse.errorResult);
        } else
            res.send(genericResponse.successResult);
    });
};
