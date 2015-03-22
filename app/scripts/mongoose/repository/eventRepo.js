
var Event           = require('../models/event');
var GenericResponse = require('../../common/sharedFunc');

exports.getEvents = function (req, res) {
    var genericResponse = new GenericResponse();
    Event.find(function(err, result) {        
        if(err) {
            res.send(genericResponse.errorResult);
        }
        genericResponse.successResult.events = result;
        res.send(genericResponse.successResult);
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
    event.save(function(err, event) {
        if (err) {
            genericResponse.errorResult.message = 'Sorry, there was an error saving the Venue Event. Error: ' + err;
            res.send(genericResponse.errorResult);
        } else 
            res.send(genericResponse.successResult);
    });

};

//TODO: implement it
exports.removeEvent = function (params) {
    var genericResponse = new GenericResponse();
    return Event.findById(params.id, function (err, event) {
        return event.remove(function (err) {
            if (err) {
                console.log(err);
                res.send(genericResponse.errorResult);
            } else 
                res.send(genericResponse.successResult);
        });
    });
};