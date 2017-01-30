var mongoose = require('mongoose');
var User = mongoose.model('User');

var ExpenseSchema = new mongoose.Schema({
  title: String,
  description: String,
  amount: Number,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true});

ExpenseSchema.methods.toJSONFor = function(user){
  return {
    title: this.title,
    description: this.description,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    author: this.author.toJSON(user)
  };
};

mongoose.model('Expense', ExpenseSchema);
