import React from 'react';
import { Route, IndexRoute } from 'react-router';

import RootContainer from './components/root/root_container';
import SessionFormContainer from './components/session_form/session_form_container';
import NewExpenseContainer from './components/expenses/new_expense_container';
import ExpenseIndexContainer from './components/expenses/expense_index_container';

export default (
  <Route path="/" component={RootContainer}>
    <IndexRoute component={ExpenseIndexContainer} />
    <Route path="/login" component={ SessionFormContainer } />
    <Route path="/signup" component={ SessionFormContainer } />
    <Route path='/new-expense' component={ NewExpenseContainer } />
  </Route>
);
