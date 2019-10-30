var mongoose = require('mongoose'),
    paranthesisModel = mongoose.model('Parenthesis');

exports.saveExpression = function (req, next) {
  paranthesisModel.updateOne(req, {$inc: {attempts: 1}}, {upsert: true}, next);
};
