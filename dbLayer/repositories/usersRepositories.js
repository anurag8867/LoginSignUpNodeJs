var MongoClient = require('mongodb').MongoClient,
    dbConfig = require('../config/config');

MongoClient.connect(dbConfig.mongoUrl, function (err, db) {
  if (err) throw err;
  var dbo = db.db(dbConfig.database);
  dbo.collection(dbConfig.userCollection).createIndex({"email": 1}, {unique: true}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Cool");
    }
    db.close();
  });
});

exports.saveUser = function (req, next) {
  MongoClient.connect(dbConfig.mongoUrl, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbConfig.database);
    dbo.collection(dbConfig.userCollection).insertOne(req, { unique: true }, next);  });
};


exports.getUser = function (req, next) {
  MongoClient.connect(dbConfig.mongoUrl, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbConfig.database);

    dbo.collection(dbConfig.userCollection).findOne(req, next);
  });
};

exports.getAllUsers = function (req, next) {
  MongoClient.connect(dbConfig.mongoUrl, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbConfig.database);
    dbo.collection(dbConfig.userCollection).find(req).toArray(next);
  });
};


exports.deleteUsers = function (req, next) {
  MongoClient.connect(dbConfig.mongoUrl, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbConfig.database);
    dbo.collection(dbConfig.userCollection).deleteMany(req, next);
  });
};

