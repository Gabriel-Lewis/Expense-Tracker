import {
	FETCH_EXPENSES, FETCH_EXPENSES_SUCCESS, FETCH_EXPENSES_ERRORS, RESET_EXPENSES,
	FETCH_EXPENSE, FETCH_EXPENSE_SUCCESS,  FETCH_EXPENSE_ERRORS, RESET_ACTIVE_EXPENSE,
	CREATE_EXPENSE, CREATE_EXPENSE_SUCCESS, CREATE_EXPENSE_ERRORS, RESET_NEW_EXPENSE,
	UPDATE_EXPENSE, UPDATE_EXPENSE_SUCCESS, UPDATE_EXPENSE_ERRORS,
	DELETE_EXPENSE, DELETE_EXPENSE_SUCCESS, DELETE_EXPENSE_ERRORS, RESET_DELETED_EXPENSE
} from '../actions/expense_actions';

import _ from 'lodash';

	// const INITIAL_STATE = {
	// 						expensesList: {expenses: [], error:null, loading: false},
	// 						newExpense: {expense:null, error: null, loading: false},
	// 						deletedExpense: {expense: null, error:null, loading: false},
	// 					};
	const INITIAL_STATE = {
		expenses: [],
		activeExpense: {expense:null, error:null},
		loading: false
	}

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case FETCH_EXPENSES:// start fetching expenses and set loading = true
  	// return {...state, expensesList: {expenses:[], error: null, loading: true} };
  	return state;
  case FETCH_EXPENSES_SUCCESS:// return list of expenses and make loading = false
    // return {...state, expensesList: {expenses: action.payload, error:null, loading: false} };
    return {...state, expenses: action.payload};
  case FETCH_EXPENSES_ERRORS:
    error = action.payload || {message: action.payload.message};
    return {...state,  expensesList: {expenses: [], error: error, loading: false} };

  case FETCH_EXPENSE:
    return {...state, activeExpense:{expense: null, loading: true}};
  case FETCH_EXPENSE_SUCCESS:
    return {...state, activeExpense: {expense: action.payload, error:null, loading: false}}
  case FETCH_EXPENSE_ERRORS:
    error = action.payload || {message: action.payload.message};
    return {...state,  activeExpense: {expense: null, error:error, loading:false}}
  case RESET_ACTIVE_EXPENSE:
    return {...state, activeExpense: {expense: null, error:null, loading: false}}

  case CREATE_EXPENSE:
  	return {...state, newExpense: {newExpense, loading: true}}
  case CREATE_EXPENSE_SUCCESS:
  	return {...state, newExpense: {expense:action.payload, error:null, loading: false}}
  case CREATE_EXPENSE_ERRORS:
    error = action.payload || {message: action.payload.message};
  	return {...state, newExpense: {expense:null, error:error, loading: false}}
  case RESET_NEW_EXPENSE:
  	return {...state, newExpense:{expense:null, error:null, loading: false}}

  case UPDATE_EXPENSE:
  	return {...state,  loading: true}
  case UPDATE_EXPENSE_SUCCESS:
  	return {...state,  activeExpense: {expense: action.payload, error:null, loading: false}}
  case UPDATE_EXPENSE_ERRORS:
    error = action.payload || {message: action.payload.message};
  	return {...state,  newExpense: {expense:null, error:error, loading: false}}

  case DELETE_EXPENSE:
   	return { deletedExpense: {deletedExpense, loading: true}}
  case DELETE_EXPENSE_SUCCESS:
  	return { deletedExpense: {expense:action.payload, error:null, loading: false}}
  case DELETE_EXPENSE_ERRORS:
    error = action.payload || {message: action.payload.message};
  	return { deletedExpense: {expense:null, error:error, loading: false}}
  case RESET_DELETED_EXPENSE:
  	return {  deletedExpense:{expense:null, error:null, loading: false}}
  default:
    return state;
  }
}
