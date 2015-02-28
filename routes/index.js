var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/*', function(req, res, next){ 
  res.setHeader('Last-Modified', (new Date()).toUTCString());
  next(); 
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Vote for Venue'});
});

module.exports = router;
