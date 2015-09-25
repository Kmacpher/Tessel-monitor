'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  species: {
    type: String
  },
  temperature: {
    high: {
      type: Number,
      required: true
    },
    low: {
      type: Number,
      required: true
    }
  },
  humidity: {
    high: {
      type: Number,
      required: true
    },
    low: {
      type: Number,
      required: true
    }
  },
  active: {
    type: Boolean,
    default: false
  }
});

mongoose.model('Critter', schema);