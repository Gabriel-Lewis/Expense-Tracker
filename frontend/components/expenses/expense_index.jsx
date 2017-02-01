import React,{Component} from 'react';
import ExpenseItem from './expense_item';

export default class ExpenseIndex extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
      if (this.props.fetchExpenses) {
        this.props.fetchExpenses()
      }
    }

    render() {
        return (
            <div className="expense-index">
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
