var MongoClient = require('mongodb').MongoClient,
    dbConfig = require('./dbLayer/config/config');
const express = require('express'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 8000;
let user = require('./api/controllers/users'),
    paranthesis = require('./api/controllers/paranthesis'),
    middleware = require('./server/middleware');

// Export app for other routes to use
let app = express();

// Starting point of the server
function main() {
  app.use(bodyParser.urlencoded({ // Middleware
    extended: true
  }));
  app.use(bodyParser.json());
  app.post('/signUp', user.signUp);
  app.post('/login', user.login);
  app.post('/balanced', middleware.checkToken, paranthesis.balanced);
  app.get('/getUsers', middleware.checkToken, user.getUsers);
  app.delete('/deleteUsers', middleware.checkToken, user.deleteUsers);
  app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });

  // Creating a MongoDB connection pool and starting the application
  // after the database connection is ready
  MongoClient.connect(dbConfig.mongoUrl, (err, db) => {
    if (err) {
      console.log(`Failed to connect to the database. ${err.stack}`);
    }
    app.locals.db = db.db(dbConfig.database);
    app.listen(port, () => {
      console.log(`Node.js app is listening at http://localhost:${port}`);
    });
  });
}

main();
