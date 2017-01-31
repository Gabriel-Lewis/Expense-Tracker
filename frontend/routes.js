import React from 'react';
import { Route, IndexRoute } from 'react-router';

import RootContainer from './components/root/root_container';
import SessionFormContainer from './components/session_form/session_form_container';
import NewExpenseContainer from './components/expenses/new_expense_container';
import ExpenseIndexContainer from './components/expenses/expense_index_container';
import ReportIndexContainer from './components/reports/report_index_container';
import {fetchExpense, fetchExpenseSuccess} from './actions/expense_actions';
import store from './store/store';

export const onEnterFetchExpense = (nextState) => {
  store.dispatch(fetchExpense(nextState.params.expenseId, localStorage.getItem('jwtToken'))).then((response) => {
    store.dispatch(fetchExpenseSuccess(response.payload.data))
  })
}

export default (
  <Route path="/" component={RootContainer}>
    <IndexRoute components={ ExpenseIndexContainer, ReportIndexContainer} />
    <Route path="/login" component={ SessionFormContainer } />
    <Route path="/signup" component={ SessionFormContainer } />
    <Route path='/new-expense' component={ NewExpenseContainer } />
    <Route path="/expenses/:expenseId/edit" component={NewExpenseContainer} onEnter={onEnterFetchExpense} />
  </Route>
);
