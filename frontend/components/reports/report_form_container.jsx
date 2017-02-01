import React,{Component} from 'react';
import {connect} from 'react-redux';
import {
  createReport,
  createReportSuccess,
  updateReport,
  updateReportSuccess,
  deleteReport,
  deleteReportSuccess} from '../../actions/report_actions';

import ReportForm from './report_form';

const mapStateToProps = ({report}) => ({
  activeReport: report.activeReport
})

const mapDispatchToProps = (dispatch, {location}) => {
  let isEditting = location.pathname.includes('edit')
  let token = localStorage.getItem('jwtToken');

  return {
  createReport: (report) => {
    dispatch(createReport(report, token))
    .then((response) => {
      dispatch(createReportSuccess(response.data.report))
    })
  },
  updateReport: (report) => {
    dispatch(updateReport(report, token))
      .then((response) => {
        dispatch(updateReportSuccess(response.payload.data.report))
      })
    },
    deleteReport: (reportId) => {
      dispatch(deleteReport(reportId, token))
      .then((response) => {
        dispatch(deleteReportSuccess())
      })
    },
    isEditting
  }
}

export default connect (mapStateToProps,mapDispatchToProps)(ReportForm);
