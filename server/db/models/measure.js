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
  },
  critter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Critter'
  }

});

mongoose.model('Measure', schema);