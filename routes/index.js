var express = require('express');
var router = express.Router();
var rave = require('../api/encryptapi.js');

/* GET home page. */
router.post('/rave/encrypt', rave.encryptRave);

module.exports = router;
