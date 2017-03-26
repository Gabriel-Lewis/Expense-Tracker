import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { fetchReports, fetchReportsSuccess } from '../../actions/report_actions';
import ReportIndex from './report_index';

const mapStateToProps = ({ report }) => {
  return {
    reports: report.reports
  };
};

const mapDispatchToProps = dispatch => ({
  fetchReports: () => {
    const token = localStorage.getItem('jwtToken');
    if (!token || token === '') {
      return;
    }
    dispatch(fetchReports(token))
      .then((res) => {
        dispatch(fetchReportsSuccess(res.payload.data.reports));
      });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportIndex);
