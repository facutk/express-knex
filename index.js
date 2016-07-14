var express = require('express');
var app = express();
var db = require('./db.js');

app.set('port', (process.env.PORT || 3000));

app.get('/', function(req, res){
    res.send('hello pg');
});

app.get('/count', function(req, res) {

    db('counter').where('uid', 1)
                 .select('count')
                 .first()
                 .returning('count')
                 .then(function(row) {
                     res.send( row );
    });

});

app.get('/count_inc', function(req, res) {

    db('counter').where('uid', 1)
                 .select('count')
                 .first()
                 .then(function(row) {

        db('counter').where('uid', 1)
                     .update({count: row.count + 1})
                     .returning('count')
                     .then(function (row){

            res.send( row );
        });

    });

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
