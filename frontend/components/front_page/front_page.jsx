import React from 'react';
import {withRouter} from 'react-router'
import ExpenseIndexContainer from '../expenses/expense_index_container';
import ReportIndexContainer from '../reports/report_index_container';

const Frontpage = () => (
  <div>
    <h3>Expenses</h3>
    <ExpenseIndexContainer />
    <h3>Reports</h3>
    <ReportIndexContainer />
  </div>
);

export default Frontpage;
