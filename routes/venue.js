var express = require('express');
var venueSvc = require('../public/scripts/mongoose/services/venueSvc');
var router = express.Router();

/* GET Venue listing. */
router.get('/venue', function(req, res,next){
    res.render("venue", { cache: false } );
});

/** Venue routing **/
router.get('/api/venues', function(req, res,next){
    venueSvc.getVenues(res);
});
router.post('/api/venues/add', function(req, res, next){
    venueSvc.addVenue(req.body);
});
router.delete('/api/venues/:id', function (req, res){
    venueSvc.removeVenue(req.params);
});

module.exports = router;