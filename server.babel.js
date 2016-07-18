var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use(express.static('public'));
app.set('port', (process.env.PORT || 3000));

var count = router.use('/count',require('./routes/count.js') );
app.use('/api/', count);

app.get('/', function(req, res){
    res.send('hello pg');
});

app.get('/api/date', function(req, res){
    res.json({
        timestamp: Date.now()
    });
});

app.use('*',function(req,res){
  res.status(404).send('404');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
