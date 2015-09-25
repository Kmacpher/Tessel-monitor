'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var Measure = mongoose.model('Measure');
var Critter = mongoose.model('Critter');

function getActiveCritter() {
  return Critter.findOne({active: true});
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
      res.status(201).send().end();
      //do I check highs and lows or just send it back?
      //depends on where twilio is working.
      //data visualization needs to change color here too
    }).then(null, next);

  }).then(null, console.error);
  
  
});

//to clear all measurements
router.delete('/:id', function(req, res, next) {
  Measure.remove({critter: req.params.id})
  .then(function() {
    res.status(204).end();
  }).then(null, next);
});


module.exports = router;