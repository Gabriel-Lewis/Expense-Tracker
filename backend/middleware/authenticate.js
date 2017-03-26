const { User } = require('../db/models/user');
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('token');
  if (!token) return next();

  jwt.verify(token, 'secret', (err, user) => {
    if (err) {
      next();
      return res.status(401).json({
        success: false,
        message: 'Please register Log in using a valid email to submit posts'
      });
    }
    req.token = token;
    req.user = user;
    next();

  });
};


module.exports = { authenticate };
