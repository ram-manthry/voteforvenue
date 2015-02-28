var express = require('express');
var router = express.Router();
var eventSvc = require('../public/scripts/mongoose/services/eventSvc');


/** API User routing **/
router.get('/api/users', function(request, response,next){
    eventSvc.getUsers(response);
});

module.exports = router;

