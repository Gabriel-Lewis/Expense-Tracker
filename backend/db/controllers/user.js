const _ = require('lodash');
const {User} = require('./../models/user');

const signup = (req, res) => {

  var body = _.pick(req.body, ['email', 'password', 'admin']);
  var user = new User(body);
    if (user) {
      res_user = user.toJSON()
    }
  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.json({ user: res_user, token: token })
  }).catch((e) => {
    res.status(400).send(e);
  })
}

const login = (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user)=> {
    return user.generateAuthToken().then((token) => {
      res.json({user: user, token: token});
    })
  }).catch((e) => {
    res.status(400).send(e);
  })
}

const logout = (req, res) => {
  req.user.removeToken(req.token).then(() => {

  }), () => {
    res.status(400).send();
  };
}

const findByToken = (req, res) => {
  let token = req.headers.token
  if (!token) {
    return res.status(401).json({message: 'User not logged in'});
  }

  User.findByToken(token).then((user)=> {
    res.json({user: user})
  })
}

module.exports = { signup, login, logout, findByToken }
