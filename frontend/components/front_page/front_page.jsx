import React from 'react';
import {withRouter} from 'react-router'
import ExpenseIndexContainer from '../expenses/expense_index_container';
import ReportIndexContainer from '../reports/report_index_container';

class Frontpage extends React.Component {
  constructor(props){
      super(props);
  }

  render () {
    if (this.props.currentUser) {
      return (
        <div className='container'>
          <ExpenseIndexContainer />
          <ReportIndexContainer />
        </div>
      )
    } else {
      return (<div></div>);
    }
  }


};

export default Frontpage;
