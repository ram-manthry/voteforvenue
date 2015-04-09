var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var ejs = require('ejs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/baseRouting');
var api = require('./routes/webApi');
var session = require('express-session')
var MongoStore = require('connect-mongo')(session);

/*
 * Application
 **/
var app = express();

var uri = "mongodb://ram-manthry:rammanthry@ds052837.mongolab.com:52837/voteforvenue";
var uri3 = "mongodb://localhost/voteforvenue";

console.log();
console.log('*******************************************************');
mongoose.connect(uri);
console.log('MongoDB Connection Established!!');

var hour = 360000000;
var expireDate = new Date(Date.now() + hour);
app.use(session({
    name:"vntevnt",
    secret: '5513dcd210ebd4e821a9b4a3',
    proxy: true,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: hour },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
//console.log(expireDate);

// view engine setup
app.engine('html', ejs.renderFile);
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'html');


// uncomment after placing your favicon in /app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use(express.static(path.join(__dirname, 'app')));
app.use(favicon(__dirname + '/app/favicon.ico'));
app.use('/bower', express.static(__dirname + '/bower_components'));
app.use('/js', express.static(__dirname + '/app/scripts'));
app.use('/jsvd', express.static(__dirname + '/app/vendor'));
app.use('/css', express.static(__dirname + '/app/styles'));
app.use('/img', express.static(__dirname + '/app/images'));
app.use('/fonts', express.static(__dirname + '/app/fonts'));
app.use('/partial', express.static(__dirname + '/app/views/partial'));
app.use('/views', express.static(__dirname + '/app/views'));


//app.use('/', routes);
app.use('/api', api);

app.all('/*', function (req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('/app/views/index.html', { root: __dirname });
});

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
