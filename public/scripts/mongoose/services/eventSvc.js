var venueResponse = require('../../common/sharedFunc');
var Event = require('../models/event');

exports.getEvents = function(req, res) {
    Event.find(function(err, result) {        
        if(err) {
            console.log(err);
            res.send(venueResponse.errorResult);
        }
        venueResponse.successResult.events = result;
        res.send(venueResponse.successResult);
    });
};


exports.addEvent = function(req, res) {
    console.log(req);
    var event = new Event({
        title: req.body.title
        , eventDate: req.body.eventDate
        , votingEndsOn: req.body.votingEndsOn
        , friends: req.body.friends
        , eventImage: req.body.eventImage
    });
    debugger;
    event.save(function(err, event) {
        if (err) {
            console.log(err);
            venueResponse.errorResult.message = 'Sorry, there was an error saving the Venue Event. Error: ' + err;
            res.send(venueResponse.errorResult);
        } else 
            res.send(venueResponse.successResult);
    });

};

exports.removeEvent= function(params) {
    return Event.findById(params.id, function (err, event) {
        return event.remove(function (err) {
            if (err) {
                console.log(err);
                res.send(venueResponse.errorResult);
            } else 
                res.send(venueResponse.successResult);
        });
    });
};