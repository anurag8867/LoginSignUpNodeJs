'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  DOB: {
    type: String,
  },
  username: {
    type: String,
  },
  role: {
    type: String,
  }
});

module.exports = mongoose.model('Users', UserSchema);
