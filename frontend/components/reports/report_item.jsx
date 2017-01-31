import React, { PropTypes } from 'react';
import {Link, withRouter} from 'react-router';

const ReportItem = ({date, amount, email, description,id}) => {
  return (
    <li className='expense-item'>
      <p>{description}</p>
      <p>date: {date}</p>
      <p>amount: {amount}</p>
      <p>owner-email: {email}</p>
      <Link to={`/expenses/${id}/edit`}>Edit</Link>
    </li>
  )
}

export default withRouter(ReportItem);
