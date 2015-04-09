var express   = require('express');
var router    = express.Router();
var userRepo  = require('../app/scripts/mongoose/repository/userRepo');
var eventRepo  = require('../app/scripts/mongoose/repository/eventRepo');
var placesRepo = require('../app/scripts/mongoose/repository/placesRepo');
var voteRepo   = require('../app/scripts/mongoose/repository/voteRepo');


/** API Event routing **/
router.get('/events', function(req, res, next) {
    return eventRepo.getEvents(req, res);
});
router.post('/events/add', function (req, res, next) {
   return eventRepo.addEvent(req, res);
});
router.delete('/events/:removeEventId', function (req, res){
    return eventRepo.removeEvent(req);
});


/** Places routing **/
router.get('/places/:eventId', function (req, res, next) {
    return placesRepo.getPlaces(req, res);
});
router.post('/places/addPlace', function (req, res, next) {
    return placesRepo.addPlace(req, res);
});
router.delete('/places/:removePlaceId', function (req, res, next) {
    return placesRepo.removePlace(req, res);
});

/** Voting routing **/
router.get('/voting/:eventId', function (req, res, next) {
    return voteRepo.getVotes(req, res);
});
router.post('/voting/addVote', function (req, res, next) {
    return voteRepo.addVote(req, res);
});

/** Session **/
router.post('/usr/logUsr', function (req, res, next) {
    console.log("user1 webapi");
    return userRepo.logUsr(req, res);
});

module.exports = router;