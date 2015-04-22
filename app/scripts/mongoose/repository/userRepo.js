var mongoose        = require('mongoose');
var GenericResponse = require('../../common/sharedFunc');

exports.logUsr = function (req, res) {
    
    console.log("user:" + req.body.url);
    console.log("user:" + req.body.scopeId);
    console.log("user:" + req.body.email);
    console.log("user:" + req.body.userName);
    console.log("user:" + req.body.firstName);
    console.log("user:" + req.body.lastName);
    
    var genericResponse = new GenericResponse();
    req.session.user = {
        userId      : req.body.scopeId,
        email       : req.body.email,
        userName    : req.body.userName,
        firstName   : req.body.firstName,
        lastName    : req.body.lastName
    };
    genericResponse.Result = genericResponse.successResult;
    res.send(genericResponse.Result);
};
