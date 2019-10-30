var MongoClient = require('mongodb').MongoClient,
    dbConfig = require('../config/config');

exports.saveExpression = function (db, req, next) {
  db.collection(dbConfig.paranthesisCollection).update(req, {$inc: {attempts: 1}}, {upsert: true}, next);
};
