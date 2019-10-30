var mongoose = require('mongoose'),
    UserModel = mongoose.model('Users');

exports.saveUser = function (req, next) {
  UserModel.create(req, {unique: true}, next);
};


exports.getUser = function (req, next) {
  UserModel.findOne(req, next);
};


exports.getAllUsers = function (req, next) {
  UserModel.find(req, next);
};


exports.deleteUsers = function (req, next) {
  UserModel.deleteMany(req, next);
};
