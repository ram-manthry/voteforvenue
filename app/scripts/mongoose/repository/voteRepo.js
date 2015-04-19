var mongoose        = require('mongoose');
var Vote            = require('../models/vote');
var GenericResponse = require('../../common/sharedFunc');


exports.getVotes = function (req, res) {
    var genericResponse = new GenericResponse();
    Vote.find({ "eventId": req.params.eventId }, function (err, result) {
        if (err) {
            res.send(genericResponse.errorResult);
        } else {
            var list = [];
            result.forEach(function (e, i, arr) {
                var dt = {
                    _id: arr[i]._id,
                    addedBy: arr[i].addedBy,
                    eventId: arr[i].eventId,
                    placeId: arr[i].placeId,
                    sessionId: arr[i].sessionId,
                    createdOn: arr[i].createdOn,
                    isTheUserVote: false,
                    userId: arr[i].user.userId
                };
                if (req.session && req.session.user && req.session.user.userId) {
                    if (dt.userId === req.session.user.userId) {
                        dt.isTheUserVote = true;
                    };
                };
                list.push(dt);
            });

            genericResponse.Result = genericResponse.successResult;
            genericResponse.Result.result = list;
        };

        res.send(genericResponse.Result);
    });
};

exports.addVote = function (req, res) {

    var genericResponse = new GenericResponse();
    if (!req.session || !req.session.user || !req.session.user.userId) {
        genericResponse.Result = genericResponse.authenticationResult;
        res.send(genericResponse.Result);
    } else {        
        var evt         = null;
        var sv          = null;
        var ss          = null;
        var plcId       = null;
        var user        = null;
        var ip          = null;

        try {
            evt         = req.body.eventId;
            sv          = req.session.votes;
            ss          = req.sessionID;
            plcId       = req.body.placeId;
            user        = req.session.user;
            ip          = req.ip;
            if (!ip) ip = req.socket._peername.address;
        } catch (err) {
        }

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
