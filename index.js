var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.set('port', (process.env.PORT || 3000));

var db = require('./db.js');



app.get('/', function(req, res){
    res.send('hello pg');
});

app.get('/count', function(req, res) {

    db.select()
    .from('counter')
    .then(function(rows) {
        res.status(200)
           .json(rows);
    });

});

app.get('/count/:uid', function(req, res) {

    var uid = parseInt(req.params.uid);

    db.select()
    .from('counter')
    .where('uid', uid)
    .first()
    .then(function(row) {

        if (row) {
            res.status(200)
            .json(row);
        } else {
            res.status(404)
               .json({
                   'message': 'not found'
               });
       }
    });

});

app.post('/count', function(req, res) {

    db.insert({
        count: 1
    })
    .into('counter')
    .returning('uid')
    .then(function (rows) {
        console.log(rows);
        res.status(200)
           .json( rows[0] );
    });

});

app.put('/count/:uid', function(req, res) {

    var uid = parseInt(req.params.uid);
    db.select()
    .from('counter')
    .where('uid', uid)
    .first()
    .then(function(rows) {

        if (rows) {
            db.update({count: rows.count + 1})
            .from('counter')
            .where('uid', uid)
            .then(function (rows){
                res.json( rows );
            });
        } else {
            res.status(404)
               .json({
                   'message': 'not found'
               });
        }

    });

});

app.delete('/count/:uid', function(req, res) {

    var uid = parseInt(req.params.uid);
    db.del()
    .from('counter')
    .where('uid', uid)
    .then(function(rows) {
        res.status(200).json( rows[0] );
    });

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
