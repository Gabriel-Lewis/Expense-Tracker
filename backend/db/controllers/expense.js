const _ = require('lodash');
const {ObjectID} = require('mongodb');
const {Expense} = require('../models/expense');

const create = (req, res) => {
  const expense = new Expense({
    description: req.body.description,
    transactionDate: req.body.transactionDate,
    amount: req.body.amount,
    author: req.user
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

  Expense.findOne({_id: id, author: req.user}).then((expense) => {
    if (!expense) {
      return res.status(404).send('404 page not found')
    }
    res.send(expense);
  }).catch((e) => res.send(e))
}

const readAll = (req, res) => {
  if (req.user.admin) {
    Expense.find({}).populate('author').then((expenses) => {
      return res.send({expenses})
    }, (e) => {
      res.status(400).send(e)
    })
  } else {
    Expense.find({
      author: req.user._id
    }).populate('author').then((expenses) => {
      res.send({expenses})
    }, (e) => {
      res.status(400).send(e)
    })
  }

}

const update = (req, res) => {

  var id = req.params.id;
  var body = _.pick(req.body, ['description', 'transactionDate', 'amount']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Expense.findOneAndUpdate({_id: id, author: req.user}, {$set: body}, {new: true})
  .then((expense) => {
    if (!expense) {
      return res.status(404).send();
    }

    res.send({expense});
  }).catch((e) => {
    res.status(400).send(e);
  })
}

const remove = (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Expense.findOneAndRemove({_id: id, author: req.user})
  .then((expense) => {
    if (!expense) {
      return res.status(404).send();
    }

    res.send({expense});
  }).catch((e) => {
    res.status(400).send();
  });
}

module.exports = {
  create,
  update,
  remove,
  read,
  readAll
}
