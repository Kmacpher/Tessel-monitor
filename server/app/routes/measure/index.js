'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var Measure = mongoose.model('Measure');

router.get('/', function(req, res, next) {
  Measure.find().then(function(measures) {
    res.send(measures);
  }).then(null, next);
});




//post here is from Tessel
router.post('/', function(req, res, next) {
  console.log(req.body);
  var postData = req.body;
  postData.date = new Date();
  //postData.critter = active critter
  Measure.create(postData)
  .then(function() {
    res.status(201).send().end();
    //do I check highs and lows or just send it back?
    //depends on where twilio is working.
    //data visualization needs to change color here
  }).then(null, next);
  //find current active species / user
  //if no use, don't save data
  //grab the too high or too low
});

//to clear all measurements
router.delete('/', function(req, res, next) {
  Measure.remove({})
  .then(function() {
    res.status(204).end();
  }).then(null, next);
});


module.exports = router;