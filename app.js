var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var ejs = require('ejs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var users = require('./routes/users');
var evt = require('./routes/event');
var venue = require('./routes/venue');

var app = express();

var uri = "mongodb://ram-manthry:rammanthry@ds052837.mongolab.com:52837/voteforvenue";
var uri2 = "mongodb://ewerton:ailn3003@ds041561.mongolab.com:41561/standupmeeting";
var uri3 = "mongodb://localhost/voteforvenue";

console.log();
console.log('*******************************************************');
mongoose.connect(uri);
console.log('MongoDB Connection stablished!!');


app.engine('html', ejs.renderFile);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);
app.use('/users', users);
app.use('/event', evt);
app.use('/venue', venue);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower', express.static(__dirname + '/bower_components'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
