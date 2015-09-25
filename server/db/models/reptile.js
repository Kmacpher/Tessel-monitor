'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: String,
  species: {
    type: String,
    required: true
  },
  temps: {
    high: {
      type: Number,
      required: true
    },
    Low: {
      type: Number,
      required: true
    }
  },
  humidity: {
    high: {
      type: Number,
      required: true
    },
    Low: {
      type: Number,
      required: true
    }
  }
});

mongoose.model('Reptile', schema);