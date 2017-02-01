const {User} = require('./../../backend/db/models/user');
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');


const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
  {
    _id: userOneId,
    email: 'gabrielhlewis@gmail.com',
    password: 'password123',
    admin: true,
    tokens: [{
      access: 'auth',
      token: jwt.sign({_id: userOneId, email:'gabrielhlewis@gmail.com', access: 'auth'}, 'secret').toString()
    }]
  },
  {
    _id: userTwoId,
    email: 'kellysheaff@gmail.com',
    password: 'password123',
    admin: false,
    tokens: [{
      access: 'auth',
      token: jwt.sign({_id: userTwoId, access: 'auth'}, 'secret').toString()
    }]
  }

]

const populateUsers = (done) => {
  User.remove({}).then(() => {
    let userOne = new User(users[0]).save();
    let userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

const userOneToken = users[0].tokens[0].token

module.exports = {
  users,
  populateUsers,
  userOneId,
  userTwoId,
  userOneToken
}
