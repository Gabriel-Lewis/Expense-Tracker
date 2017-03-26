import React, { PropTypes } from 'react';
import { Link, withRouter } from 'react-router';

const ExpenseItem = ({ date, amount, email, description, id }) => {
  const dateString = new Date(date).toDateString();
  return (
    <li className="expense-item">
      <h4>{description}</h4>
      <p>{dateString}</p>
      <p>amount: {(amount / 100).toFixed(2)}</p>
      <p>owner-email: {email}</p>
      <Link to={`/expenses/${id}/edit`}>Edit</Link>
    </li>
  );
};

export default withRouter(ExpenseItem);
