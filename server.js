var express = require('express');
var app = express();
var db = require('./db.js');

var port = 3000;

app.get('/', function(req, res) {

    db('counter').where('uid', 1)
                 .select('count')
                 .first()
                 .then(function(row) {

        db('counter').where('uid', 1)
                     .update({count: row.count + 1})
                     .returning('count')
                     .then(function (row){

            res.sendStatus( row );
        });
                     
    });
});

app.listen(port, function(){
    console.log('Listening on port', port);
});
