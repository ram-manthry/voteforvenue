var mongoose = require('mongoose')
    , user = require('../models/user.js');

function UserList(connection) {
    mongoose.connect(connection,function(err,db){
        if(err){
            console.log("Error: unable to connect to database");
            return;
        }
    });
}

UserList.prototype = {
    getUsers: function(response) {
        user.find(function(err, users) {
            if(err) {
                console.log(err);
            }
            response.send(users);
        });
    },

    addUser: function(req,res) {
        var newUser = new user();
        newUser.name = req.body.name;
        newUser.save(function savedTask(err){
            if(err) {
                throw err;
            }
        });
        //res.redirect('/');
    }

}

module.exports = UserList;