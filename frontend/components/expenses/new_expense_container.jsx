import React,{Component} from 'react';
import {connect} from 'react-redux';
import {
  createExpense,
  createExpenseSuccess,
  updateExpense,
  updateExpenseSuccess,
  deleteExpense,
  deleteExpenseSuccess} from '../../actions/expense_actions';

import NewExpense from './new_expense';

const mapStateToProps = ({expense}) => ({
  activeExpense: expense.activeExpense
})

const mapDispatchToProps = (dispatch, {location}) => {
  let isEditting = location.pathname.includes('edit')
  let token = localStorage.getItem('jwtToken');

  return {
  createExpense: (expense) => {
    dispatch(createExpense(expense, token))
    .then((response) => {
      dispatch(createExpenseSuccess(response.data))
    })
  },
  updateExpense: (expense) => {
    dispatch(updateExpense(expense, token))
      .then((response) => {
        dispatch(updateExpenseSuccess(response.payload.data.expense))
      })
    },
    deleteExpense: (id) => {
      dispatch(deleteExpense(id, token))
      .then((response) => {
        dispatch(deleteExpenseSuccess())
      })
    },
    isEditting
  }
}

export default connect (mapStateToProps,mapDispatchToProps)(NewExpense);
