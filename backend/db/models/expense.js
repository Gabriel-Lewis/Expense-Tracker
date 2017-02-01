var mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var ExpenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "can't be blank"],
    trim: true
  },
  amount: {
    type: Currency,
    required: [true, "can't be blank"]
  },
  transactionDate: {
    type: Date,
    required: [true, "can't be blank"]
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
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
