var express = require('express');
var app = express();
var db = require('./db.js');

app.set('port', (process.env.PORT || 3000));

app.get('/', function(req, res){
    res.send('hello pg');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
