import axios from 'axios';

//Expense list
export const FETCH_EXPENSES = 'FETCH_EXPENSES';
export const FETCH_EXPENSES_SUCCESS = 'FETCH_EXPENSES_SUCCESS';
export const FETCH_EXPENSES_FAILURE = 'FETCH_EXPENSES_FAILURE';
export const RESET_EXPENSES = 'RESET_EXPENSES';

//Create new post
export const CREATE_EXPENSE = 'CREATE_EXPENSE';
export const CREATE_EXPENSE_SUCCESS = 'CREATE_EXPENSE_SUCCESS';
export const CREATE_EXPENSE_FAILURE = 'CREATE_EXPENSE_FAILURE';
export const RESET_NEW_EXPENSE = 'RESET_NEW_EXPENSE';

//Validate post fields like Title, Categries on the server
export const VALIDATE_EXPENSE_FIELDS = 'VALIDATE_EXPENSE_FIELDS';
export const VALIDATE_EXPENSE_FIELDS_SUCCESS = 'VALIDATE_EXPENSE_FIELDS_SUCCESS';
export const VALIDATE_EXPENSE_FIELDS_FAILURE = 'VALIDATE_EXPENSE_FIELDS_FAILURE';
export const RESET_EXPENSE_FIELDS = 'RESET_EXPENSE_FIELDS';

//Fetch post
export const FETCH_EXPENSE = 'FETCH_EXPENSE';
export const FETCH_EXPENSE_SUCCESS = 'FETCH_EXPENSE_SUCCESS';
export const FETCH_EXPENSE_FAILURE = 'FETCH_EXPENSE_FAILURE';
export const RESET_ACTIVE_EXPENSE = 'RESET_ACTIVE_EXPENSE';

//Delete post
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const DELETE_EXPENSE_SUCCESS = 'DELETE_EXPENSE_SUCCESS';
export const DELETE_EXPENSE_FAILURE = 'DELETE_EXPENSE_FAILURE';
export const RESET_DELETED_EXPENSE = 'RESET_DELETED_EXPENSE';



const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

export function fetchExpenses(token) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/expenses`,
    headers: {
    'token': `${token}`
  }
  });

  return {
    type: FETCH_EXPENSES,
    payload: request
  };
}

export function fetchExpensesSuccess(expenses) {
  return {
    type: FETCH_EXPENSES_SUCCESS,
    payload: expenses
  };
}

export function fetchExpensesFailure(error) {
  return {
    type: FETCH_EXPENSES_FAILURE,
    payload: error
  };
}


export function createExpense(props, tokenFromStorage) {
  const request = axios({
    method: 'post',
    data: props,
    url: `${ROOT_URL}/expenses`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: CREATE_EXPENSE,
    payload: request
  };
}

export function createExpenseSuccess(newExpense) {
  return {
    type: CREATE_EXPENSE_SUCCESS,
    payload: newExpense
  };
}

export function createExpenseFailure(error) {
  return {
    type: CREATE_EXPENSE_FAILURE,
    payload: error
  };
}

export function resetNewExpense() {
  return {
    type: RESET_NEW_EXPENSE
  }
}
;

export function resetDeletedExpense() {
  return {
    type: RESET_DELETED_EXPENSE
  }
}
;

export function fetchExpense(id) {
  const request = axios.get(`${ROOT_URL}/expenses/${id}`);

  return {
    type: FETCH_EXPENSE,
    payload: request
  };
}


export function fetchExpenseSuccess(activeExpense) {
  return {
    type: FETCH_EXPENSE_SUCCESS,
    payload: activeExpense
  };
}

export function fetchExpenseFailure(error) {
  return {
    type: FETCH_EXPENSE_FAILURE,
    payload: error
  };
}

export function resetActiveExpense() {
  return {
    type: RESET_ACTIVE_EXPENSE
  }
}


export function deleteExpense(id, tokenFromStorage) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/expenses/${id}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });
  return {
    type: DELETE_EXPENSE,
    payload: request
  };
}

export function deleteExpenseSuccess(deletedExpense) {
  return {
    type: DELETE_EXPENSE_SUCCESS,
    payload: deletedExpense
  };
}

export function deleteExpenseFailure(response) {
  return {
    type: DELETE_EXPENSE_FAILURE,
    payload: response
  };
}
