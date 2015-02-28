var mongoose = require('mongoose');
var shared = require('../../common/sharedFunc');
var user = require('../models/user.js');

UserList.prototype = {
    getUsers: function(response) {
        user.find(function(err, users) {
            if(err) {
                console.log(err);
                return shared.errorResult;
            }
            response.send(users);
        });
    },

    addUser: function(req,res) {
        var newUser = new user();
        newUser.name = req.body.name;
        newUser.save(function savedTask(err){
            if(err) {
                return shared.errorResult;
            } else 
                return shared.successResult;
        });
        //res.redirect('/');
    }

}

module.exports = UserList;