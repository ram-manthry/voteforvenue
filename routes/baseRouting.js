var express = require('express');
var router = express.Router();

var appTitle = 'Vote for Venue'

/* GET home page. */
router.get('/*', function(req, res, next){ 
  res.setHeader('Last-Modified', (new Date()).toUTCString());
  next(); 
});

router.get('/', function(req, res, next) {
  res.render('index', { title: appTitle });
});

module.exports = router;
