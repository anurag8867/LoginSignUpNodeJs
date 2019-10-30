'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParenthesisSchema = new Schema({
  email: {
    type: String,
  },
  message: {
    type: String,
    default: "Failure"
  },
  attempts: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Parenthesis', ParenthesisSchema);
