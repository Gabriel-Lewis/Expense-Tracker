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

const mapDispatchToProps = (dispatch, {location, router}) => {
  let isEditting = location.pathname.includes('edit')
  let token = localStorage.getItem('jwtToken');

  return {
  createReport: (report) => {
    dispatch(createReport(report, token))
    .then((response) => {
      dispatch(createReportSuccess(response.data))
      router.push('/')
    })
  },
  updateReport: (report) => {
    dispatch(updateReport(report, token))
      .then((response) => {
        dispatch(updateReportSuccess(response.data))
        router.push('/')
      })
    },
    deleteReport: (reportId) => {
      dispatch(deleteReport(reportId, token))
      .then((response) => {
        dispatch(deleteReportSuccess())
        router.push('/')
      })
    },
    isEditting
  }
}

export default connect (mapStateToProps,mapDispatchToProps)(ReportForm);
