let jwt = require('jsonwebtoken'),
    config = require('../../server/config'),
    userRepo = require('../../dbLayer/repositories/usersRepositories');

/**
 * It will register the new user
 * @param req
 * @param res
 * @return json
 */
exports.signUp = function (req, res) {
  let email = req.body.email;
  let password = req.body.password;
  let DOB = req.body.DOB;
  let username = req.body.username;
  let role = req.body.role;


  if (!email && !password && !DOB && !username && !role) {
    res.status(400).json({
      success: false,
      message: 'Bad Request'
    });
  } else {
    //save into the database
    userRepo.saveUser(req.app.locals.db, {
      email: email,
      password: password,
      DOB: DOB,
      username: username,
      role: role
    }, function (err, data) {
      if (err) {
        if(err.errmsg && err.errmsg.substring(0, config.errMessageLength) === config.errMessage) {
          res.status(409).json({
            success: false,
            message: 'User found, Please Login'
          });
        } else {
          res.status(500).json({
            success: false,
            message: 'An Error occured',
            error: err
          });
        }
      } else {
        if (data && data.insertedCount && data.ops && data.ops[0] && data.ops[0].username) {
          res.json({
            success: true,
            message: data.ops[0].username + ' is registerd successfully'
          });
        } else {
          res.json({
            success: true,
            message: 'Something wrong has happened while signup',
          });
        }
      }
    });
  }
};

/**
 * It will login the user and generate a token
 * @param req
 * @param res
 * @return json
 */
exports.login = function (req, res) {
  let email = req.body.email;
  let password = req.body.password;

  if (!email && !password) {
    res.status(400).json({
      success: false,
      message: 'Bad Request'
    });
  } else {
    userRepo.getUser(req.app.locals.db, {
      email: email,
      password: password
    }, function (err, data) {
      if (err) {
        res.status(500).json({
          success: false,
          message: 'An Error occured',
          error: err
        });
      } else {
        if (data && data.role && data.username && data.email) {
          let token = jwt.sign({username: data.username, role: data.role, email: data.email},
              config.secretKey,
              {
                expiresIn: config.tokenExpireTime
              }
          );
          // return the JWT token for the future API calls
          res.json({
            success: true,
            message: 'Authentication successful!',
            token: token
          });
        } else {
          res.status(403).json({
            success: false,
            message: 'Incorrect username or password'
          });
        }
      }
    });
  }
};

/**
 * It will check the role of user
 * @param req
 * @param requestParams
 * @return boolean/json
 */
function isAdmin(req, res) {
  if (req && req.decoded && req.decoded.role) {
    if (req.decoded.role !== config.admin) {
      res.json({
        success: false,
        message: 'Not Allowed: Only admin have access to do this operation'
      });
    } else {
      return true;
    }
  }
}


/**
 * It will get all the users
 * @param req
 * @param res
 * @return json
 */
exports.getUsers = function (req, res) {
  if (isAdmin(req, res)) {
    userRepo.getAllUsers(req.app.locals.db, {}, function (err, data) {
      if (err) {
        res.status(500).json({
          success: false,
          message: 'An Error has occured',
          error: err
        });
      } else {
        if (data) {
          res.json(data);
        } else {
          res.json({
            success: true,
            message: 'Data Not Found',
          });
        }
      }
    });
  }
};

/**
 * It will delete the user
 * @param req
 * @param res
 * @return json
 */
exports.deleteUsers = function (req, res) {
    if (isAdmin(req, res)) {
      userRepo.deleteUsers(req.app.locals.db, {role: req.decoded.role}, function (err, data) {
        if (err) {
          res.status(500).json({
            success: false,
            message: 'An Error has occured',
            error: err
          });
        } else {
          if (data && data.deletedCount) {
            res.json({
              success: true,
              message: data.deletedCount + ' Users Deleted successfuly',
            });
          } else {
            res.json({
              success: true,
              message: 'No User Found with role admin',
            });
          }
        }
      });
    }
  };
