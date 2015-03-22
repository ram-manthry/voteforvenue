var mongoose        = require('mongoose');
var Place           = require('../models/place');
var GenericResponse = require('../../common/sharedFunc');


exports.getPlaces = function (req, res) {
    var genericResponse = new GenericResponse();
    Place.find({ "eventId": req.params.eventId }).find(function (err, places) {        
        if(err) {
            res.send(genericResponse.errorResult);
        } 
        genericResponse.successResult.places = places;
        res.send(genericResponse.successResult);
    });
};

exports.addPlace = function (req, res) {
    var genericResponse = new GenericResponse();
    var place = new Place({
        name      : req.body.name
        , location: req.body.location
        , mapUrl  : req.body.mapUrl
        , eventId : req.body.eventId
    });

    place.save(function (err, place) {
        var genericResponse = new GenericResponse();
        if (err) {
            console.error(err);
            genericResponse.errorResult.message = 'Sorry, there was an error saving the Place. Error: ' + err;
            res.send(genericResponse.errorResult);
        } else
            res.send(genericResponse.successResult);
    });

};

//TODO: implement it
exports.removePlace = function (req, res) {
    var genericResponse = new GenericResponse();
    return Place.findById(req.params.id, function (err, Place) {
        return Place.remove(function (err) {
            if (err) {
                res.send(genericResponse.errorResult);
            }else {
                res.send(genericResponse.successResult);
            }
        });
    });
};
