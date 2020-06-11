  

var express = require('express'),
  router = express.Router(),
  Goals = require('../models/goals');

router.get('/', function (req, res) {
  Goals.get(req.query, function (err, response) {
    res.json( response );
  });
});

module.exports = router;