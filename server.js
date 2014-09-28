var express = require('express'),
    //exphbs  = require('express-handlebars'),
    //fs = require('fs'),
    logger = require('morgan'),
    engines = require('consolidate'),
    swig = require('swig');

//// ### Middleware to handle 404
//var notFound = function(req,res,next){
//    res.statusCode = 404;
//    res.description = 'Not found';
//    res.render('404');
//};
//// ### Middleware to internal server errors
//var errorHandler = function(err,req,res,next){
//    res.render('error',{description:'Please check the URL.'});
//};

var app = express();
app.engine('html', engines.swig);
//app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('views','./views');
app.set('view engine', 'html');



app.set("view options", {
    layout: false
});
//
//app.engine('html', function(path, options, fn){
//    var cacheLocation = path + ':html';
//    if(typeof module.exports.cache[cacheLocation] === "string"){
//        return fn(null, module.exports.cache[cacheLocation]);
//    }
//    fs.readFile(path, 'utf8', function(err, data){
//        if(err) { return fn(err); }
//        return fn(null, module.exports.cache[cacheLocation] = data);
//    });
//});
//app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
//app.get('/',function(req,res){
//    res.render('index');
//});
app.get('/', function(request, response){
    response.render("index");
});
//app.use(notFound);
//app.use(errorHandler);

// ### Start Express
var start = function(port){
    return app.listen(port, function() {
        console.log('Express server listening on port %d in %s mode', port, app.settings.env);
    });
};
var server = start(process.env.PORT || 3000);
