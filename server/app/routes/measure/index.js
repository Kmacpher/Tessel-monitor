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
  Measure.create(postData)
  .then(function() {
    res.status(201).send().end();
  }).then(null, next);
  //find current active species / user
  //grab the too high or too low
});


module.exports = router;