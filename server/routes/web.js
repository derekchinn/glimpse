var express = require('express');
var router = express.Router();
var debug = require('debug')('glimpse:router:web');

var Planner = require('../planner/planner');

router.get('/', function(req, res) {
    var planner = new Planner({
        apiKey: '50ajfaqf3ynb4unhf1xfb7bno7',
        type: Planner.types.SMARTSHEET
    });

    res.render('index', {text: planner.apiKey});
});

module.exports = router;