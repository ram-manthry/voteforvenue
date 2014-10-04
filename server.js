var express = require('express'),
    logger = require('morgan'),
    engines = require('consolidate'),
    swig = require('swig'),
    mongoose = require('mongoose');

var uri = "mongodb://ram-manthry:rammanthry@ds052837.mongolab.com:52837/voteforvenue";

mongoose.connect(uri,function(err,db){
    if(err){
        console.log("Error: unable to connect to database");
        return;
    }
});


mongoose.model('users',{name:String});

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
    mongoose.model('users').find(function(err,users){
        response.send(users);
    });
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
