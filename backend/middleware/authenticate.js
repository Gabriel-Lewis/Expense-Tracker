const {User} = require('../db/models/user');
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  var token = req.header('token');
  if (!token) return next();

  jwt.verify(token, 'secret', function(err, user) {
    if (err) {
      next()
      return res.status(401).json({
        success: false,
        message: 'Please register Log in using a valid email to submit posts'
      });
    } else {
      req.token = token;
      req.user = user;
      next();
    }
  });
}


module.exports = { authenticate }
