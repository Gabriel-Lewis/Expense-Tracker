const _ = require('lodash');
const mongoose = require('mongoose');
const validator = require('validator');
var uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {ObjectId} = require('mongodb');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "can't be blank"],
    lowercase: true,
    trim: true,
    unique: true,
    validate: validator.isEmail,
    message: '{VALUE} is not a valid email',
    index: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      require: true
    },
    token: {
      type: String,
      require: true
    }
  }],
  expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }],
  reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }],
  admin: {
    type: Boolean,
    required: true
  }
});

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({_id: user._id.toHexString(), email: user.email, admin: user.admin, access}, 'secret').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  })
};

UserSchema.methods.removeToken = function(token) {
  let user = this;
  return user.update({
    $pull: {
      tokens: { token }
    }
  });
}

UserSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email', 'admin']);
};

UserSchema.statics.findByToken = function(token) {
  const User = this;
  let decoded;
  try {
    decoded = jwt.verify(token, 'secret');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function(email, password) {
  var User = this
  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

UserSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }

});

const User = mongoose.model('User', UserSchema);

module.exports = { User }
