import React, { PropTypes } from 'react'

const ExpenseItem = ({expense}) => {
  return (
    <li className='expense-item'>
      <p>expense.date</p>
      <p>expense.author</p>
      <p>expense.amount</p>
    </li>
  )
}

export default ExpenseItem
