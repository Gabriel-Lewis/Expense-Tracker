import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchExpenses, fetchExpensesSuccess} from '../../actions/expense_actions';
import ExpenseIndex from './expense_index';

const mapStateToProps = ({expense}) => {
  return {
  expenses: expense.expenses
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchExpenses: () => {
    let token = localStorage.getItem('jwtToken');
    if(!token || token === '') {
      return;
    }
    dispatch(fetchExpenses(token))
      .then((res) => {
        dispatch(fetchExpensesSuccess(res.payload.data.expenses))
      })
  },
})

export default connect ( mapStateToProps, mapDispatchToProps)(ExpenseIndex);
