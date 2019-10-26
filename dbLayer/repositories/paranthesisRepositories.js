var MongoClient = require('mongodb').MongoClient,
    dbConfig = require('../config/config');

exports.saveExpression = function (req, next) {
  MongoClient.connect(dbConfig.mongoUrl, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbConfig.database);
    dbo.collection(dbConfig.paranthesisCollection).update( req, { $inc: { attempts: 1} }, { upsert : true }, next);
  });
};
