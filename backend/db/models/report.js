var mongoose = require('mongoose');

var {Expense} = require('./expense');

var ReportSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  expenseList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }],
  startDate: Date,
  endDate: Date
}, {timestamps: true});

ReportSchema.methods.toJSONFor = function(user){
  return {
    id: this._id,
    createdAt: this.createdAt,
    expenseList: this.expenseList,
    startDate: this.startDate,
    endDate: this.endDate,
    author: this.author.toJSON(user)
  };
};

ReportSchema.pre('save', function (next) {
  const report = this
  console.log(report);
  Expense.find({author: report.author}).where('transactionDate').lt(report.endDate).gt(report.startDate).then((expenses) => {
    console.log(expenses);
    report.expenseList = expenses;
    next()
  }, (e) => {
    next()
  })
})

const Report = mongoose.model('Report', ReportSchema);

module.exports = {Report}
