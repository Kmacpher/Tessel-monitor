'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var Measure = mongoose.model('Measure');
var Critter = mongoose.model('Critter');
var myTwilio = require('./twilio');

function getActiveCritter() {
  return Critter.findOne({active: true});
}

function compareData(critter, postData) {
    if(critter.temperature.low > postData.temperature || critter.temperature.high < postData.temperature) {
      myTwilio.sendMessage(critter, 'temperature', postData);
    }

    if(critter.humidity.low > postData.humidity || critter.humidity.high < postData.humidity) {
      myTwilio.sendMessage(critter, 'humidity', postData);
    }
      
}

router.get('/:id', function(req, res, next) {
  Measure.find({critter: req.params.id}).sort({'date': -1}).limit(50)
  .then(function(measures) {
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