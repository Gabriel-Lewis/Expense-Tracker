const {User} = require('../db/models/user');
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  var token = req.headers['token'];
  if (!token) return next();

  jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Please register Log in using a valid email to submit posts'
      });
    } else {
      req.user = user;
      next();
    }
  });
}


module.exports = { authenticate }
