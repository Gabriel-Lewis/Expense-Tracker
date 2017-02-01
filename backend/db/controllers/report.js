const _ = require('lodash');
const {ObjectID} = require('mongodb');
const {Report} = require('../models/report');

const create = (req, res) => {
  const report = new Report({
    author: req.user,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  });
  report.save().then((doc) => {
    res.send(doc)
  }, (e) => {
    res.status(400).send(e)
  })
}

const read = (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('404 page not found')
  }

  Report.findOne({_id: id, author: req.user}).populate('expenseList')
  .then((report) => {
    if (!report) {
      return res.status(404).send('404 page not found')
    }
    res.send(report);
  }).catch((e) => res.send(e))
}

const readAll = (req, res) => {
  Report.find({
    author: req.user._id
  }).populate('expenseList')
  .then((reports) => {
    res.send({reports})
  }, (e) => {
    res.status(400).send(e)
  })
}

const remove = (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Report.findOneAndRemove({_id: id, author: req.user})
  .then((report) => {
    if (!report) {
      return res.status(404).send();
    }

    res.send({report});
  }).catch((e) => {
    res.status(400).send();
  });
}

module.exports = {
  create,
  read,
  readAll,
  remove
}
