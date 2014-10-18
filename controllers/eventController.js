var mongoose = require('mongoose')
    , Event = require('../models/event.js');

function EventController(connection) {
    mongoose.connect(connection,function(err,db){
        if(err){
            console.log("Error: unable to connect to database");
            return;
        }
    });
}

exports.getEvents= function(response) {
    Event.find(function(err, events) {
        if(err) {
            console.log(err);
        }
        response.send(events);
    });
};


exports.addEvent= function(eventJson) {

    var event = new Event({
        title: eventJson.title
        , eventDate: eventJson.eventDate
        , votingEndsOn: eventJson.votingEndsOn
    });

    event.save(function(err, event) {
        if (err) return console.error(err);

    });

};

exports.removeEvent= function(params) {

    return Event.findById(params.id, function (err, event) {
        return event.remove(function (err) {
            if (err) {
                console.log(err);
            }
        });
    });
};