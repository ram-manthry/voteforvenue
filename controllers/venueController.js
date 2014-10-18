var mongoose = require('mongoose')
    , Venue = require('../models/venue.js');

function EventController(connection) {
    mongoose.connect(connection,function(err,db){
        if(err){
            console.log("Error: unable to connect to database");
            return;
        }
    });
}

exports.getVenues= function(response) {
    Venue.find(function(err, venues) {
        if(err) {
            console.log(err);
        }
        response.send(venues);
    });
};

exports.addVenue= function(venuejson) {

    var venue = new Venue({
        name: venuejson.name
        , location: venuejson.location
    });

    venue.save(function(err, venue) {
        if (err) return console.error(err);

    });

};

exports.removeVenue= function(params) {

    return Venue.findById(params.id, function (err, venue) {
        return venue.remove(function (err) {
            if (err) {
                console.log(err);
            }
        });
    });
};
