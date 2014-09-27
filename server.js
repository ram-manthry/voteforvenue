var express = require('express');

var app = express();
app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res){
    res.send('hello');
});

// ### Start Express
var start = function(port){
    return app.listen(port, function() {
        console.log('Express server listening on port %d in %s mode', port, app.settings.env);
    });
};
var server = start(process.env.PORT || 3000);
