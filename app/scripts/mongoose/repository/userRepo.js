var mongoose        = require('mongoose');
var GenericResponse = require('../../common/sharedFunc');

exports.logUsr = function (req, res) {
    
    console.log("user1:" + req.session);
    console.log("user1:" + req.body.scopeId);
    console.log("user2:" + req.body.email);
    console.log("user3:" + req.body.firstName);
    console.log("user4:" + req.body.lastName);
    
    var genericResponse = new GenericResponse();
    req.session.usr = {
        userId      : res.body.scopeId,
        email       : res.body.email,
        firstName   : res.body.firstName,
        lastName    : res.body.lastName
    };
    genericResponse.Result = genericResponse.successResult;
    res.send(genericResponse.Result);
};
