var mongoose        = require('mongoose');
var Vote            = require('../models/vote');
var GenericResponse = require('../../common/sharedFunc');


exports.getVotes = function (req, res) {
    var genericResponse = new GenericResponse();
    Vote.find({ "eventId": req.params.eventId }, function (err, result) {
        if (err) {
            res.send(genericResponse.errorResult);
        } else {
            genericResponse.Result = genericResponse.successResult;
            genericResponse.Result.result = result;
        }

        res.send(genericResponse.Result);
    });
};

exports.addVote = function (req, res) {

    var genericResponse = new GenericResponse();
    if (!req.session || !req.session.user || !req.session.user.userId) {
        genericResponse.Result = genericResponse.authenticationResult;
        res.send(genericResponse.Result);
    } else {        
        var evt = req.body.eventId;
        var sv = req.session.votes;
        var ss = req.sessionID;
        var plcId = req.body.placeId;
        var user = req.session.user;
        var ip = req.ip;

        if(!ip) ip = req.socket._peername.address;

        Vote.findOne({ "user.userId": user.userId, "eventId": evt }, function (err, result) {

            if (err) {
                res.send(genericResponse.errorResult);
            } else if (result && result._id) {
                genericResponse.Result.message = 'Your vote has already been computed';
                genericResponse.Result.code = genericResponse.warningResult.code;
                res.send(genericResponse.Result);
            } else {

                var vote = new Vote({
                    addedBy: user.userName
                    , eventId: evt
                    , placeId: plcId
                    , sessionId: ss
                    , user: user
                    , ip: ip
                });

                vote.save(function (err, vote) {
                    if (err) {
                        genericResponse.Result.message = 'Sorry, there was an error adding the vote. Error: ' + err;
                        genericResponse.Result.code = genericResponse.successResult.code;
                    } else {
                        genericResponse.Result = genericResponse.successResult;
                    }
                    res.send(genericResponse.Result);
                });
            };
        });
    };

    //console.log("--------------------------------")
    //console.log(req.headers)
    //console.log("--------------------------------")
    //console.log(req.socket)
    //console.log("--------------------------------")
    //console.log(req.socket._peername)
    //console.log("ip requested: " + req.ip)
    //console.log(usr)
    //console.log(req.socket._peername.address)
    //console.log(req.session)
    //console.log(vote);
    //console.log("--------------------------------")
    
};
