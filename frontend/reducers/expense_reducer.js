import {
	FETCH_EXPENSES, FETCH_EXPENSES_SUCCESS, FETCH_EXPENSES_ERRORS, RESET_EXPENSES,
	FETCH_EXPENSE, FETCH_EXPENSE_SUCCESS,  FETCH_EXPENSE_ERRORS, RESET_ACTIVE_EXPENSE,
	CREATE_EXPENSE, CREATE_EXPENSE_SUCCESS, CREATE_EXPENSE_ERRORS, RESET_NEW_EXPENSE,
	UPDATE_EXPENSE, UPDATE_EXPENSE_SUCCESS, UPDATE_EXPENSE_ERRORS,
	DELETE_EXPENSE, DELETE_EXPENSE_SUCCESS, DELETE_EXPENSE_ERRORS, RESET_DELETED_EXPENSE
} from '../actions/expense_actions';

import _ from 'lodash';

	const INITIAL_STATE = {
		expenses: [],
		activeExpense: null,
    newExpense: null,
    deletedExpense: null,
		loading: false,
    error: null
	}

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case FETCH_EXPENSES:
  	return {...state, loading: true };
  	return state;
  case FETCH_EXPENSES_SUCCESS:
    return {...state, expenses: action.payload, loading: false};
  case FETCH_EXPENSES_ERRORS:
    error = action.payload || {message: action.payload.message};
    return {...state,  expenses: [], error: error, loading: false };

  case FETCH_EXPENSE:
    return {...state, activeExpense:null, loading: true};
  case FETCH_EXPENSE_SUCCESS:
    return {...state, activeExpense: action.payload, error:null, loading: false}
  case FETCH_EXPENSE_ERRORS:
    error = action.payload || {message: action.payload.message};
    return {...state,  activeExpense: null, error:error, loading:false}
  case RESET_ACTIVE_EXPENSE:
    return {...state, activeExpense: null, error:null, loading: false}

  case CREATE_EXPENSE:
  	return {...state, newExpense: null, loading: true}
  case CREATE_EXPENSE_SUCCESS:
  	return {...state, newExpense: action.payload, error:null, loading: false}
  case CREATE_EXPENSE_ERRORS:
    error = action.payload || {message: action.payload.message};
  	return {...state, newExpense:null, error:error, loading: false}
  case RESET_NEW_EXPENSE:
  	return {...state, newExpense:null, error:null, loading: false}

  case UPDATE_EXPENSE:
  	return {...state,  loading: true}
  case UPDATE_EXPENSE_SUCCESS:
  	return {...state,  activeExpense:  action.payload, error:null, loading: false}
  case UPDATE_EXPENSE_ERRORS:
    error = action.payload || {message: action.payload.message};
  	return {...state,  newExpense: null, error:error, loading: false}

  case DELETE_EXPENSE:
   	return { deletedExpense: null, loading: true}
  case DELETE_EXPENSE_SUCCESS:
  	return { deletedExpense: action.payload, error:null, loading: false}
  case DELETE_EXPENSE_ERRORS:
    error = action.payload || {message: action.payload.message};
  	return { deletedExpense: null, error:error, loading: false}
  case RESET_DELETED_EXPENSE:
  	return {  deletedExpense:null, error:null, loading: false}
  default:
    return state;
  }
}
