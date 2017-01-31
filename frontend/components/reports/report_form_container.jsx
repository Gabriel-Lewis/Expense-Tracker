import React,{Component} from 'react';
import {connect} from 'react-redux';
import {
  createReport,
  createReportSuccess,
  updateReport,
  updateReportSuccess,
  deleteReport,
  deleteReportSuccess} from '../../actions/report_actions';

import NewReport from './new_expense';

const mapStateToProps = ({expense}) => ({
  activeReport: expense.activeReport.expense
})

const mapDispatchToProps = (dispatch, {location}) => {
  let isEditting = location.pathname.includes('edit')
  let token = localStorage.getItem('jwtToken');

  return {
  createReport: (expense) => {
    dispatch(createReport(expense, token))
    .then((response) => {
      dispatch(createReportSuccess(response.data.expense))
    })
  },
  updateReport: (expense) => {
    dispatch(updateReport(expense, token))
      .then((response) => {
        dispatch(updateReportSuccess(response.payload.data.expense))
      })
    },
    deleteReport: (id) => {
      dispatch(deleteReport(id, token))
      .then((response) => {
        dispatch(deleteReportSuccess())
      })
    },
    isEditting
  }
}

export default connect (mapStateToProps,mapDispatchToProps)(NewReport);
