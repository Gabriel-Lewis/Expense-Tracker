const _ = require('lodash');
const {ObjectID} = require('mongodb');
const Expense = require('../models/expense');

const create = (req, res) => {
  const expense = new Expense({
    text: req.body.text,
    _creator: req.user._id
  });
  expense.save().then((doc) => {
    res.send(doc)
  }, (err) => {
    res.status(400).send(err)
  })
}

const read = (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('404 page not found')
  }

  Expense.findOne({_id: id, _creator: req.user._id}).then((expense) => {
    if (!expense) {
      return res.status(404).send('404 page not found')
    }
    res.send({expense});
  }).catch((e) => res.send(e))
}

const readAll = (req, res) => {
  
  Expense.find({
    author: req.user._id
  }).then((expenses) => {
    res.send({expenses})
  }, (e) => {
    res.status(400).send(e)
  })
}

const update = (req, res) => {

}

const remove = (req, res) => {

}

module.exports = {
  create,
  update,
  remove,
  read,
  readAll
}
