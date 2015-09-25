'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  //maybe just a species 
  //you can alter the presets if you want to
  name: {
    type: String,
    unique: true
  },
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

mongoose.model('Setting', schema);