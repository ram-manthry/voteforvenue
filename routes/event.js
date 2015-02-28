var express = require('express');
var router = express.Router();
var eventSvc = require('../public/scripts/mongoose/services/eventSvc');


/* GET User listing. */


/** API User routing **/
router.get('/api/events', function(req, res, next){
    return eventSvc.getEvents(req, res);
});
router.post('/api/events/add', function (req, res, next) {
    debugger;
   return eventSvc.addEvent(req, res);
});
router.delete('/api/events/:id', function (req, res){
    return eventSvc.removeEvent(req.params);
});

module.exports = router;