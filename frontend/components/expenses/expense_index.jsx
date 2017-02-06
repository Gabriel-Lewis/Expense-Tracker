import React,{Component} from 'react';
import ExpenseItem from './expense_item';

export default class ExpenseIndex extends Component {

    constructor(props){
        super(props);
    }

    componentWillMount() {
        this.props.fetchExpenses()
    }

    render() {
        return (
            <div className="expense-index">
              <h3>Expenses</h3>
              <ul>
                {
                  this.props.expenses.map(expense => (
                  <ExpenseItem
                    key={expense._id}
                    id={expense._id}
                    date={expense.transactionDate}
                    description={expense.description}
                    amount={expense.amount}
                    email={expense.author.email}
                    id={expense._id}
                    />
                ))
              }
              </ul>
            </div>
        );
    }
}
