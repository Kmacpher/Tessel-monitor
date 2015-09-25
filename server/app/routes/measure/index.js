'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var Measure = mongoose.model('Measure');
var Critter = mongoose.model('Critter');

function getActiveCritter() {
  return Critter.findOne({active: true});
}

function compareData(critter, postData) {
    if(critter.temperature.low > postData.temperature)
      console.log('temp is too low');
    if(critter.temperature.high < postData.temperature)
      console.log('temp is too high');
    if(critter.humidity.low > postData.humidity)
      console.log('humidity is too low');
    if(critter.humidity.high < postData.humidity)
      console.log('temp is too low');
}

router.get('/:id', function(req, res, next) {
  Measure.find({critter: req.params.id}).then(function(measures) {
    res.send(measures);
  }).then(null, next);
});

//post here is from Tessel
router.post('/', function(req, res, next) {
  var postData = req.body;

  getActiveCritter().then(function(critter) {
    if(critter==={} || critter === null) {
      console.log('no active critter');
      return;
    }
    postData.date = new Date();
    postData.critter = critter._id;
    Measure.create(postData)
      .then(function() {
        compareData(critter, postData);
        res.status(201).send().end();
    }).then(null, next);
  }).then(null, console.error);
   
});

router.delete('/:id', function(req, res, next) {
  Measure.remove({critter: req.params.id})
  .then(function() {
    res.status(204).end();
  }).then(null, next);
});


module.exports = router;