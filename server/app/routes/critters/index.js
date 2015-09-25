var router = require('express').Router();
var mongoose = require('mongoose');
var Critter = mongoose.model('Critter');

router.get('/', function(req, res, next) {
  Critter.find().then(function(critters) {
    res.send(critters);
  }).then(null, next);
});

router.get('/active', function(req, res, next) {
  Critter.findOne({active: true}).then(function(critter) {
    res.send(critter);
  }).then(null, next);
});

router.get('/:id', function(req, res, next) {
  console.log('in the right route');
  console.log(req.params.id);
  Critter.findById(req.params.id).then(function(critter) {
    res.send(critter);
  }).then(null, next);
});

module.exports = router;