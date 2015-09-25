'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({

  date: {
    type: Date,
    required: true
  },
  humidity: {
    type: Number,
    required: true
  },
  temperature: {
    type: Number,
    required: true
  }

});

mongoose.model('Measure', schema);