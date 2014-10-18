var express = require('express'),
    logger = require('morgan'),
    engines = require('consolidate'),
    swig = require('swig'),
    mongoose = require('mongoose'),
    eventController = require('./controllers/eventController'),
    venueController = require('./controllers/venueController');

var uri = "mongodb://ram-manthry:rammanthry@ds052837.mongolab.com:52837/voteforvenue";
var UserList = require('./controllers/userController.js');
var userList = new UserList(uri);

// ### Middleware to handle 404
var notFound = function(req,res,next){
    res.statusCode = 404;
    res.description = 'Not found';
    res.render('404',{cache: false});
};
// ### Middleware to internal server errors
var errorHandler = function(err,req,res,next){
    res.render('error',{cache: false,description:'Please check the URL.'});
};

var app = express();
app.engine('html', engines.swig);
app.set('views','./views');
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response,next){
    response.render("index",{cache: false});
});

app.get('/users', function(request, response,next){
    userList.getUsers(response);
});

app.get('/api/events', function(request, response,next){
    eventController.getEvents(response);
});
app.post('/api/events/add', function(request, response,next){
    eventController.addEvent(request.body);
});
app.delete('/api/events/:id', function (req, res){
    eventController.removeEvent(req.params);
});


app.get('/api/venues', function(request, response,next){
    venueController.getVenues(response);
});
app.post('/api/venues/add', function(request, response,next){
    venueController.addVenue(request.body);
});
app.delete('/api/venues/:id', function (req, res){
    venueController.removeVenue(req.params);
});



app.use(notFound);
app.use(errorHandler);

// ### Start Express
var start = function(port){
    return app.listen(port, function() {
        console.log('Express server listening on port %d in %s mode', port, app.settings.env);
    });
};
var server = start(process.env.PORT || 3000);
