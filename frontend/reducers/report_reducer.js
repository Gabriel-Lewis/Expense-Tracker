import {
	FETCH_REPORTS, FETCH_REPORTS_SUCCESS, FETCH_REPORTS_ERRORS, RESET_REPORTS,
	FETCH_REPORT, FETCH_REPORT_SUCCESS,  FETCH_REPORT_ERRORS, RESET_ACTIVE_REPORT,
	CREATE_REPORT, CREATE_REPORT_SUCCESS, CREATE_REPORT_ERRORS, RESET_NEW_REPORT,
	DELETE_REPORT, DELETE_REPORT_SUCCESS, DELETE_REPORT_ERRORS, RESET_DELETED_REPORT
} from '../actions/report_actions';

import _ from 'lodash';

	// const INITIAL_STATE = {
	// 						reportsList: {reports: [], error:null, loading: false},
	// 						newReport: {report:null, error: null, loading: false},
	// 						deletedReport: {report: null, error:null, loading: false},
	// 					};
	const INITIAL_STATE = {
		reports: [],
		activeReport: {report:null, error:null},
		loading: false
	}

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case FETCH_REPORTS:// start fetching reports and set loading = true
  	// return {...state, reportsList: {reports:[], error: null, loading: true} };
  	return state;
  case FETCH_REPORTS_SUCCESS:// return list of reports and make loading = false
    // return {...state, reportsList: {reports: action.payload, error:null, loading: false} };
    return {...state, reports: action.payload};
  case FETCH_REPORTS_ERRORS:
    error = action.payload || {message: action.payload.message};
    return {...state,  reportsList: {reports: [], error: error, loading: false} };

  case FETCH_REPORT:
    return {...state, activeReport:{report: null, loading: true}};
  case FETCH_REPORT_SUCCESS:
    return {...state, activeReport: {report: action.payload, error:null, loading: false}}
  case FETCH_REPORT_ERRORS:
    error = action.payload || {message: action.payload.message};
    return {...state,  activeReport: {report: null, error:error, loading:false}}
  case RESET_ACTIVE_REPORT:
    return {...state, activeReport: {report: null, error:null, loading: false}}

  case CREATE_REPORT:
  	return {...state, newReport: {newReport, loading: true}}
  case CREATE_REPORT_SUCCESS:
  	return {...state, newReport: {report:action.payload, error:null, loading: false}}
  case CREATE_REPORT_ERRORS:
    error = action.payload || {message: action.payload.message};
  	return {...state, newReport: {report:null, error:error, loading: false}}
  case RESET_NEW_REPORT:
  	return {...state, newReport:{report:null, error:null, loading: false}}

  case DELETE_REPORT:
   	return { deletedReport: {deletedReport, loading: true}}
  case DELETE_REPORT_SUCCESS:
  	return { deletedReport: {report:action.payload, error:null, loading: false}}
  case DELETE_REPORT_ERRORS:
    error = action.payload || {message: action.payload.message};
  	return { deletedReport: {report:null, error:error, loading: false}}
  case RESET_DELETED_REPORT:
  	return {  deletedReport:{report:null, error:null, loading: false}}
  default:
    return state;
  }
}
