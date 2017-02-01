import React, { PropTypes } from 'react';
import {Link, withRouter} from 'react-router';

import ExpenseItem from '../expenses/expense_item';

const ReportItem = ({startDate,endDate, expenses, id, totalSpent}) => {
  return (
    <li className='report-item'>
      <p>Start Date: {startDate}</p>
      <p>End Date: {endDate}</p>
      <p>Total Spent: {(totalSpent/100).toFixed(2)}</p>
      <ul>
        {expenses.map(expense => (
          <ExpenseItem
            key={id, expense._id}
            description={expense.description}
            date={expense.transactionDate}
            amount={expense.amount}
            email={expense.author.email}
            id={expense._id}
            />
        ))}
      </ul>
    </li>
  )
}

export default ReportItem;

//   />
