let jwt = require('jsonwebtoken'),
    config = require('../../server/config'),
    paranthesisRepo = require('../../dbLayer/repositories/paranthesisRepositories'),
    paranthesisService = require('../service/paranthesisService');

exports.balanced = function (req, res) {
  if (paranthesisService.isParanthesisbalanced(req.body.paranthesis)) {

    //save into the database
    paranthesisRepo.saveExpression(req.app.locals.db,
        {
          email: req.decoded.email,
          message: "Success",
        }, function (err, data) {
          if (err) {
            res.status(500).json({
              success: false,
              message: 'An Error occured',
              error: err
            });
          } else {
            if (data) {
              res.json({
                success: true,
                message: 'Paranthesis saved successfully'
              });
            }
          }
        })
  } else {
    res.json({
      success: false,
      message: 'Failure: Paranthesis is not balanced'
    });

  }
};
