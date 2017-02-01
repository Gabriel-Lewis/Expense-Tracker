const {Expense} = require('./../../backend/db/models/expense');
const {ObjectID} = require('mongodb');
const {userOneId, userTwoId} = require('./user')

const expenses = [
  {
    _id: new ObjectID(),
    description: 'First Test Expense',
    author: userOneId,
    amount: 4303,
    transactionDate: '12/01/2016'
  },
  {
    _id: new ObjectID(),
    description: 'Second Test Expense',
    author: userTwoId,
    amount: 130,
    transactionDate: '12/19/2016'
  },
  {
    _id: new ObjectID(),
    description: 'Third Test Expense',
    author: userOneId,
    amount: 100,
    transactionDate: '12/12/2016'
  }
];

const populateExpenses = (done) => {
    Expense.remove({}).then(() => {
      return Expense.insertMany(expenses);
    }).then(() => done());
}

module.exports = {
  expenses,
  populateExpenses
}
