var router = require('express').Router();
var mongoose = require('mongoose');
var Critter = mongoose.model('Critter');

router.get('/', function(req, res, next) {
  Critter.find().then(function(critters) {
    res.send(critters);
  }).then(null, next);
});

module.exports = router;