var express = require('express');
var app = express();
var db = require('./db.js');

var port = 3000;

app.listen(port, function(){
    console.log('Listening on port', port);
});
