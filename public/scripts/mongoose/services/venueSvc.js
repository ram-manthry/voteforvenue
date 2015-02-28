var mongoose = require('mongoose');
var shared = require('../../common/sharedFunc');
var Venue = require('../models/venue');


exports.getVenues= function(response) {
    Venue.find(function(err, venues) {
        if(err) {
            console.log(err);
            return shared.errorResult;
        } 
        return shared.successResult.prototype.venues = venues;
    });
};

exports.addVenue= function(venuejson) {

    var venue = new Venue({
        name: venuejson.name
        , location: venuejson.location
    });

    venue.save(function(err, venue) {
        if (err) {
            console.error(err);
            return shared.errorResult;
        }else 
            return shared.successResult;
    });

};

exports.removeVenue= function(params) {

    return Venue.findById(params.id, function (err, venue) {
        return venue.remove(function (err) {
            if (err) {
                return shared.errorResult;
            }else {
                return shared.successResult;
            }
        });
    });
};
