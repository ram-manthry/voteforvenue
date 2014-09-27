var express = require('express'),
    exphbs  = require('express-handlebars'),
    logger = require('morgan');

// ### Middleware to handle 404
var notFound = function(req,res,next){
    res.statusCode = 404;
    res.description = 'Not found';
    res.render('404');
};
// ### Middleware to internal server errors
var errorHandler = function(err,req,res,next){
    res.render('error',{description:'Please check the URL.'});
};

var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('views','./views');
app.set('view engine', 'handlebars');
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res){
    res.render('index');
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
