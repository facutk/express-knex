var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.get('/', function(req, res){
    console.log('request received');
    res.send('hello node again');
});

app.get('/env', function(req, res){
    console.log(process.env.NODE_ENV);
    res.send('env');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
