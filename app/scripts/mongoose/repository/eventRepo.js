
var Event           = require('../models/event');
var GenericResponse = require('../../common/sharedFunc');

exports.getEvents = function (req, res) {
    var genericResponse = new GenericResponse();
    Event.find(function(err, result) {        
        if (err) {
            genericResponse.Result = genericResponse.errorResult;
            genericResponse.Result.code = genericResponse.errorResult.code;
        } else {
            genericResponse.successResult.result = result;
            genericResponse.Result = genericResponse.successResult;
        };

        res.send(genericResponse.Result);
    });
};

exports.addEvent = function (req, res) {
    var genericResponse = new GenericResponse();
    var event = new Event({
        title: req.body.title
        , eventDate: req.body.eventDate
        , votingEndsOn: req.body.votingEndsOn
        , friends: req.body.friends
        , eventImage: req.body.eventImage
    });

    event.save(function (err, result) {
        if (err) {
            genericResponse.Result.code = genericResponse.errorResult.code;
            genericResponse.Result.message = 'Sorry, there was an error saving the Venue Event. Error: ' + err;
        } else {
            genericResponse.Result = genericResponse.successResult;
            genericResponse.Result.result = result;
        };

        res.send(genericResponse.Result);
    });

};

//TODO: implement it
exports.removeEvent = function (params) {
    var genericResponse = new GenericResponse();
    return Event.findById(params.id, function (err, result) {
        return result.remove(function (err, rs) {
            if (err) {
                console.log(err);
                genericResponse.Result = genericResponse.errorResult;
                genericResponse.Result.code = genericResponse.errorResult.code;
            } else {
                genericResponse.successResult.result = rs;
                genericResponse.Result = genericResponse.successResult;
            };

            res.send(genericResponse.Result);
        });
    });
};