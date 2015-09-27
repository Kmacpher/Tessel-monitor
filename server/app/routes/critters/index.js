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
  Critter.findById(req.params.id).then(function(critter) {
    res.send(critter);
  }).then(null, next);
});

router.delete('/:id', function(req, res, next) {
  Critter.remove({_id: req.params.id}).then(function() {
    res.status(204).end();
  }).then(null, next);
});

router.put('/:id', function(req, res, next) {
  Critter.update({_id: req.params.id}, {$set: req.body})
  .then(function() {
    res.status(201).end();
  }).then(null, next);
});

router.post('/', function(req, res, next) {
  Critter.create(req.body).then(function(critter) {
    res.status(201).send(critter);
  }).then(null, next);
});

module.exports = router;
