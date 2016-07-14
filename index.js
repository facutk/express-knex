var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var db = require('./db.js');

app.set('port', (process.env.PORT || 3000));

app.get('/', function(req, res){
    res.send('hello pg');
});

app.post('/', function(req, res){
    console.log(req.body);
    res.send('ok');
});

app.get('/count/:uid', function(req, res) {

    var uid = parseInt(req.params.uid);

    db.select('count')
    .from('counter')
    .where('uid', uid)
    .first()
    .then(function(row) {
        var count = 0;
        if (row) count = row.count;
        res.status(200)
           .json({
               count: count
           });
    });

});

app.get('/count_inc', function(req, res) {

    db.select('count')
    .from('counter')
    .where('uid', 1)
    .first()
    .then(function(row) {

        if (row) {
            db.update({count: row.count + 1})
            .from('counter')
            .where('uid', 1)
            .returning('count')
            .then(function (row){
                res.json( row );
            });
        } else {

            db.insert({count: 1})
            .into('counter')
            .returning('count')
            .then(function (row){
                res.send( row.count );
            });

        }

    });

});

app.delete('/count/:uid', function(req, res) {

    var uid = parseInt(req.params.uid);
    db.del()
    .from('counter')
    .where('uid', uid)
    .then(function(row) {
        var count = 0;
        res.json( count );
    });

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
