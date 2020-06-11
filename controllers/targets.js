  
 
var express = require('express'),
    router = express.Router(),
    Targets = require('../models/targets');

router.get('/', function (req, res) {
  Targets.get(req.query, function (err, response) {
    res.json( response );
  });
});

module.exports = router;