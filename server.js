  

var express = require('express'),
  app = express(),
  fs = require('fs'),
  cors = require('cors'),
  port = process.env.PORT || 3000;

app.use(cors());
app.use('/favicon.ico', express.static('images/favicon.ico'));

app.use( require('./controllers') );

app.listen(port, function () {
  console.log('loading JSON for SDGs ..');

  GOALS = {};
  GOALS.en = JSON.parse( fs.readFileSync('data/goals-final.json') );
  GOALS.es = JSON.parse( fs.readFileSync('data/goals-final-es.json') );
  GOALS.fr = JSON.parse( fs.readFileSync('data/goals-final-fr.json') );
  GOALS.ru = JSON.parse( fs.readFileSync('data/goals-final-ru.json') );

  TARGETS = JSON.parse( fs.readFileSync('data/targets-final.json') );
  INDICATORS = JSON.parse( fs.readFileSync('data/indicators-final.json') );
   
  console.log('ready!');
});