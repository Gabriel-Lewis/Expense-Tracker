import React, { PropTypes } from 'react';

import ExpenseItem from '../expenses/expense_item';

const ReportItem = ({ startDate,endDate, expenses, id, totalSpent }) => {
  const startDateString = new Date(startDate).toDateString();
  const endDateString = new Date(endDate).toDateString();
  return (
    <li className="report-item">
      <p>Start Date: {startDateString}</p>
      <p>End Date: {endDateString}</p>
      <p>Total Spent: {(totalSpent / 100).toFixed(2)}</p>
      <ul>
        {expenses.map(expense => (
          <ExpenseItem
            key={id + expense._id}
            description={expense.description}
            date={expense.transactionDate}
            amount={expense.amount}
            id={expense._id}
            />
        ))}
      </ul>
    </li>
  );
};

export default ReportItem;
