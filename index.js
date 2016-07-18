var express = require('express');
//var router = express.Router();
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.set('port', (process.env.PORT || 3000));

var count = require('./routes/count.js');
app.use('/count', count);


app.get('/', function(req, res){
    res.send('hello pg');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
