var mongoose = require('mongoose');
var User = mongoose.model('User');

var ExpenseSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  transactionDate: Date,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  authorEmail: String
}, {timestamps: true});

ExpenseSchema.methods.toJSONFor = (user) => {
  return {
    description: this.description,
    amount: this.amount,
    transactionDate: this.transactionDate,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    author: this.author.toJSON(user)
  };
};

const Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = { Expense }
