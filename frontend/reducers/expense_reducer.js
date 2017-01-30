import {
	FETCH_EXPENSES, FETCH_EXPENSES_SUCCESS, FETCH_EXPENSES_ERRORS, RESET_EXPENSES,
	FETCH_EXPENSE, FETCH_EXPENSE_SUCCESS,  FETCH_EXPENSE_ERRORS, RESET_ACTIVE_EXPENSE,
	CREATE_EXPENSE, CREATE_EXPENSE_SUCCESS, CREATE_EXPENSE_ERRORS, RESET_NEW_EXPENSE,
	DELETE_EXPENSE, DELETE_EXPENSE_SUCCESS, DELETE_EXPENSE_ERRORS, RESET_DELETED_EXPENSE
} from '../actions/expense_actions';

import _ from 'lodash';

	const INITIAL_STATE = {
							expensesList: {expenses: [], error:null, loading: false},
							newExpense: {expense:null, error: null, loading: false},
							activeExpense: {expense:null, error:null, loading: false},
							deletedExpense: {expense: null, error:null, loading: false},
						};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case FETCH_EXPENSES:// start fetching expenses and set loading = true
  	return _.merge(state, { expensesList: {expenses:[], error: null, loading: true} });
  case FETCH_EXPENSES_SUCCESS:// return list of expenses and make loading = false
    return _.merge(state, { expensesList: {expenses: action.payload, error:null, loading: false} });
  case FETCH_EXPENSES_ERRORS:// return error and make loading = false
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return _.merge(state, { expensesList: {expenses: [], error: error, loading: false} });
  case RESET_EXPENSES:// reset expenseList to initial state
    return {  expensesList: {expenses: [], error:null, loading: false} };

  case FETCH_EXPENSE:
    return _.merge(state, {  activeExpense:{activeExpense, loading: true}});
  case FETCH_EXPENSE_SUCCESS:
    return _.merge(state, {  activeExpense: {expense: action.payload, error:null, loading: false}})
  case FETCH_EXPENSE_ERRORS:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return _.merge(state, {  activeExpense: {expense: null, error:error, loading:false}})
  case RESET_ACTIVE_EXPENSE:
    return _.merge(state, {  activeExpense: {expense: null, error:null, loading: false}})

  case CREATE_EXPENSE:
  	return _.merge(state, { newExpense: {newExpense, loading: true}})
  case CREATE_EXPENSE_SUCCESS:
  	return _.merge(state, { newExpense: {expense:action.payload, error:null, loading: false}})
  case CREATE_EXPENSE_ERRORS:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
  	return _.merge(state, { newExpense: {expense:null, error:error, loading: false}})
  case RESET_NEW_EXPENSE:
  	return _.merge(state, {  newExpense:{expense:null, error:null, loading: false}})


  case DELETE_EXPENSE:
   	return { deletedExpense: {deletedExpense, loading: true}}
  case DELETE_EXPENSE_SUCCESS:
  	return { deletedExpense: {expense:action.payload, error:null, loading: false}}
  case DELETE_EXPENSE_ERRORS:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
  	return { deletedExpense: {expense:null, error:error, loading: false}}
  case RESET_DELETED_EXPENSE:
  	return {  deletedExpense:{expense:null, error:null, loading: false}}
  default:
    return state;
  }
}
