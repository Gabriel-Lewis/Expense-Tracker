var mongoose = require('mongoose');

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
    endDate: this.endDate
    author: this.author.toJSON(user)
  };
};

mongoose.model('Report', ReportSchema);
