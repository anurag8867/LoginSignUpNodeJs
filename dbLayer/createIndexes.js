var MongoClient = require('mongodb').MongoClient,
    dbConfig = require('./config/config');

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
