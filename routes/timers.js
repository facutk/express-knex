var express = require('express');
var router = express.Router();
var db = require('../db.js');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.json');

router.get('/', function(req, res) {

    fs.readFile(DATA_FILE, (err, data) => {
        res.setHeader('Cache-Control', 'no-cache');
        res.json(JSON.parse(data));
    });

    /*
    db.select()
    .from('counter')
    .then(function(rows) {
        res.status(200)
           .json(rows);
    });
    */

});
/*
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
*/

router.post('/', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        const timers = JSON.parse(data);
        const newTimer = {
            title: req.body.title,
            project: req.body.project,
            id: req.body.id,
            elapsed: 0,
            runningSince: null,
        };
        timers.push(newTimer);
        fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
            res.setHeader('Cache-Control', 'no-cache');
            res.json(timers);
        });
    });
});

router.post('/start', function(req, res) {
    fs.readFile(DATA_FILE, (err, data) => {
        const timers = JSON.parse(data);
        timers.forEach((timer) => {
            if (timer.id === req.body.id) {
                timer.runningSince = req.body.start;
            }
        });
        fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
            res.setHeader('Cache-Control', 'no-cache');
            res.json({});
            res.end();
        });
    });
});

router.post('/stop', function(req, res) {
    fs.readFile(DATA_FILE, (err, data) => {
        const timers = JSON.parse(data);
        timers.forEach((timer) => {
            if (timer.id === req.body.id) {
                const delta = req.body.stop - timer.runningSince;
                timer.elapsed += delta;
                timer.runningSince = null;
            }
        });
        fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
            res.setHeader('Cache-Control', 'no-cache');
            res.json({});
            res.end();
        });
    });
});

router.put('/', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        const timers = JSON.parse(data);
        timers.forEach((timer) => {
            if (timer.id === req.body.id) {
                timer.title = req.body.title;
                timer.project = req.body.project;
            }
        });
        fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
            res.setHeader('Cache-Control', 'no-cache');
            res.json({});
            res.end();
        });
    });
});

router.delete('/', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        var timers = JSON.parse(data);
        timers = timers.reduce((memo, timer) => {
            if (timer.id === req.body.id) {
                return memo;
            } else {
                return memo.concat(timer);
            }
        }, []);
        fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
            res.setHeader('Cache-Control', 'no-cache');
            res.json({});
            res.end();
        });
    });
});

module.exports = router;
