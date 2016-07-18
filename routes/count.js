var express = require('express');
var router = express.Router();
var db = require('../db.js');

router.get('/', function(req, res) {

    db.select()
    .from('counter')
    .then(function(rows) {
        res.status(200)
           .json(rows);
    });

});

router.get('/:uid', function(req, res) {

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

router.post('/', function(req, res) {

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

router.put('/:uid', function(req, res) {

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

router.delete('/:uid', function(req, res) {

    var uid = parseInt(req.params.uid);
    db.del()
    .from('counter')
    .where('uid', uid)
    .then(function(rows) {
        res.status(200).json( rows[0] );
    });

});


module.exports = router;
