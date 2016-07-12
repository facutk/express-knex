var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.get('/', function(req, res){
    res.send('hello node again');
});

app.get('/db', function(req, res){
    res.send(process.env.DATABASE_URL);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
