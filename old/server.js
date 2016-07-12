var express = require('express');
var app = express();
//var db = require('./db.js');

app.set('port', (process.env.PORT || 3000));

app.get('/', function(req, res) {
    res.sendStatus('env:' + process.env.NODE_ENV);
//    db('counter').where('uid', 1)
//                 .select('count')
//                 .first()
//                 .then(function(row) {

//        db('counter').where('uid', 1)
//                     .update({count: row.count + 1})
//                     .returning('count')
//                     .then(function (row){
//
//            res.sendStatus( row );
//        });

//    });

});

app.listen(app.get('port'), function(){
    console.log('Listening on port', app.get('port'));
});
