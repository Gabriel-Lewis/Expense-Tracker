import React,{Component} from 'react';
import ExpenseItem from './expense_item';

export default class ExpenseIndexContainer extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    componentWillMount() {
      this.props.fetchExpenses()
    }

    render() {
        return (
            <div className="expense-index">
              <ul>
                {this.props.expenses.map(expense => (
                  <ExpenseItem
                    key={expense._id}
                    expense={expense}
                    />
                ))}
              </ul>
            </div>
        );
    }
}
