var mongoose        = require('mongoose');
var Place           = require('../models/place');
var GenericResponse = require('../../common/sharedFunc');


exports.getPlaces = function (req, res) {
    var genericResponse = new GenericResponse();
    Place.find({ "eventId": req.params.eventId }).find(function (err, result) {        
        if(err) {
            genericResponse.Result = genericResponse.errorResult;
        } else {
            genericResponse.Result = genericResponse.successResult;
            genericResponse.Result.result = result
        };

        res.send(genericResponse.Result);
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

    place.save(function (err, result) {
        var genericResponse = new GenericResponse();
        if (err) {
            console.error(err);
            genericResponse.errorResult.message = 'Sorry, there was an error saving the Place. Error: ' + err;
            genericResponse.Result.code = genericResponse.errorResult.code;
            res.send(genericResponse.errorResult);
        } else
            res.send(genericResponse.successResult);
    });

};

//TODO: implement it
exports.removePlace = function (req, res) {
    var genericResponse = new GenericResponse();
    return Place.findById(req.params.id, function (err, data) {
        return data.remove(function (err) {
            if (err) {
                res.send(genericResponse.errorResult);
            }else {
                res.send(genericResponse.successResult);
            }
        });
    });
};
