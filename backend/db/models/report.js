const mongoose = require('mongoose');

const { Expense } = require('./expense');

const ReportSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  expenseList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }],
  startDate: {
    type: Date,
    required: [true, "can't be blank"],
  },
  endDate: {
    type: Date,
    required: [true, "can't be blank"],
  },
  totalSpent: {
    type: Number
  }
}, { timestamps: true });

ReportSchema.methods.toJSONFor = function(user) {
  return {
    id: this._id,
    createdAt: this.createdAt,
    expenseList: this.expenseList,
    startDate: this.startDate,
    endDate: this.endDate,
    author: this.author.toJSON(user)
  };
};

ReportSchema.pre('save', function(next) {
  const report = this;
  Expense.find({ author: report.author })
  .where('transactionDate')
  .lt(report.endDate)
  .gt(report.startDate)
  .then((expenses) => {
    let total = 0;
    expenses.forEach((expense) => {
      total += expense.amount;
    });
    report.totalSpent = total;
    report.expenseList = expenses;
    next();
  }, (e) => {
    next();
  });
});

const Report = mongoose.model('Report', ReportSchema);

module.exports = { Report };
