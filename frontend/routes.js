import React from 'react';
import { Route, IndexRoute } from 'react-router';

import RootContainer from './components/root/root_container';
import SessionFormContainer from './components/session_form/session_form_container';
import NewExpenseContainer from './components/expenses/new_expense_container';
import ReportFormContainer from './components/reports/report_form_container';
import FrontPageContainer from './components/front_page/front_page_container';
import { fetchExpense, fetchExpenseSuccess } from './actions/expense_actions';
import { fetchReport, fetchReportSuccess } from './actions/report_actions';
import store from './store/store';

export const onEnterFetchExpense = (nextState) => {
  store.dispatch(fetchExpense(nextState.params.expenseId, localStorage.getItem('jwtToken'))).then((response) => {
    store.dispatch(fetchExpenseSuccess(response.payload.data))
  })
}

export const onEnterFetchReport = (nextState) => {
  store.dispatch(fetchReport(nextState.params.reportId, localStorage.getItem('jwtToken'))).then((response) => {
    store.dispatch(fetchReportSuccess(response.payload.data))
  })
}

export const ensureLoggedIn = (nextState, replace) => {
    // console.log(store.getState());
    let token = localStorage.getItem('jwtToken');
    console.log(token);
    // if (!token) {
    //   replace('/login');
    // }
  };

export const redirectIfLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.user;
    if (currentUser) {
      replace('/');
    }
  }

export default (
  <Route path="/" component={ RootContainer }>
    <IndexRoute component={ FrontPageContainer } />
    <Route path="/login" component={ SessionFormContainer } />
    <Route path="/signup" component={ SessionFormContainer } />
    <Route path='/new-expense' component={ NewExpenseContainer } />
    <Route path="/expenses/:expenseId/edit" component={NewExpenseContainer} onEnter={onEnterFetchExpense} />
    <Route path='/new-report' component={ ReportFormContainer } />
    <Route path="/reports/:reportId/edit" component={ReportFormContainer} onEnter={onEnterFetchReport} />

  </Route>
);
