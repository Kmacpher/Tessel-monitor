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
  },
  photo: {
    type: String,
    default: 'http://orig11.deviantart.net/cf4a/f/2014/171/d/a/toothless_chibi___how_to_train_your_dragon_by_hikariuta-d7n64gv.png'
  },
  lastAlerted: Date

});

mongoose.model('Critter', schema);