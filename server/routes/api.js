var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send('Yup. API.');
});

router.get('/v1', function(req, res) {
    res.send('Yup. V1 API.');
});

module.exports = router;