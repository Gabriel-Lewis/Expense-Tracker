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

const mapDispatchToProps = (dispatch, {location, router}) => {
  let isEditting = location.pathname.includes('edit')
  let token = localStorage.getItem('jwtToken');

  return {
  createExpense: (expense) => {
    dispatch(createExpense(expense, token))
    .then((response) => {
      dispatch(createExpenseSuccess(response.data))
      router.push("/")
    })
  },
  updateExpense: (expense) => {
    dispatch(updateExpense(expense, token))
      .then((response) => {
        dispatch(updateExpenseSuccess(response.payload.data.expense))
        router.push("/")
      })
    },
    deleteExpense: (id) => {
      dispatch(deleteExpense(id, token))
      .then((response) => {
        dispatch(deleteExpenseSuccess())
        router.push("/")
      })
    },
    isEditting
  }
}

export default connect (mapStateToProps,mapDispatchToProps)(NewExpense);
