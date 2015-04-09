var mongoose        = require('mongoose');
var Vote            = require('../models/vote');
var GenericResponse = require('../../common/sharedFunc');


exports.getVotes = function (req, res) {
    var genericResponse = new GenericResponse();
    Vote.find({ "eventId": req.params.eventId }).find(function (err, result) {
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
    var userHasVoted = false;
    var evt     = req.body.eventId;
    var sv      = req.session.votes;    
    var ss      = req.sessionID;
    var plcId   = req.body.placeId;
    var usr     = req.session.usr;
    var ip      = req.ip;
        
    if(!ip) ip = req.socket._peername.address;    
        
    var genericResponse = new GenericResponse();
    var vote = new Vote({
        addedBy: "noUser"
        , eventId: evt
        , placeId: plcId
        , sessionId: ss
        , user : usr
        , ip: ip
    });

    //console.log("--------------------------------")
    //console.log(req.headers)
    //console.log("--------------------------------")
    //console.log(req.socket)
    //console.log("--------------------------------")
    //console.log(req.socket._peername)
    console.log("ip requested: " + req.ip)
    //console.log(req.socket._peername.address)
    console.log(req.session)
    console.log(vote);
    //console.log("--------------------------------")
    
    if (!sv) {
        req.session.votes = [];
    } else {
        sv.forEach(function (e, i, arr) {
            var l = arr[i];
            if (l && (l.s && l.s === us && l.evt && l.evt === evt)) {
                genericResponse.Result.message = 'Your vote has already been computed';
                genericResponse.Result.code = genericResponse.warningResult.code;
                res.send(genericResponse.Result);
                userHasVoted = true;
            };
        });
    };

    //Add current vote
    req.session.votes.push({ s: us, evt: evt });

    if (userHasVoted) return;


    vote.save(function (err, vote) {
        if (err) {
            req.session.vote = null;
            genericResponse.Result.message = 'Sorry, there was an error adding the vote. Error: ' + err;
            genericResponse.Result.code = genericResponse.successResult.code;
        } else {
            genericResponse.Result = genericResponse.successResult;
        }
        res.send(genericResponse.Result);
    });
};
