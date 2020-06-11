  

var express = require('express'),
  router = express.Router();

router.get('/', function (req, res) {
  res.json( { 'HomePage' : 'Welcome to TechBuzs Sustainable Development Goal API for GreenHorizon' } );
});

router.use('/goals', require('./goals'));
router.use('/targets', require('./targets'));
router.use('/indicators', require('./indicators'));

module.exports = router;