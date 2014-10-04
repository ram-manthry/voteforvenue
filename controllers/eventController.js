var mongoose = require('mongoose')
    , event = require('../models/event.js');

function EventController(connection) {
    mongoose.connect(connection,function(err,db){
        if(err){
            console.log("Error: unable to connect to database");
            return;
        }
    });
}

exports.getEvents= function(response) {
    event.find(function(err, events) {
        if(err) {
            console.log(err);
        }
        response.send(events);
    });
};

