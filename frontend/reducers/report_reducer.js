import {
	FETCH_REPORTS, FETCH_REPORTS_SUCCESS, FETCH_REPORTS_ERRORS, RESET_REPORTS,
	FETCH_REPORT, FETCH_REPORT_SUCCESS,  FETCH_REPORT_ERRORS, RESET_ACTIVE_REPORT,
	CREATE_REPORT, CREATE_REPORT_SUCCESS, CREATE_REPORT_ERRORS, RESET_NEW_REPORT,
	DELETE_REPORT, DELETE_REPORT_SUCCESS, DELETE_REPORT_ERRORS, RESET_DELETED_REPORT
} from '../actions/report_actions';

import _ from 'lodash';

	const INITIAL_STATE = {
		reports: [],
		activeReport: null,
    newReport: null,
    deletedReport: null,
		loading: false,
    error: null
	}

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case FETCH_REPORTS:
  	return {...state, loading: true}
  case FETCH_REPORTS_SUCCESS:
    return {...state, reports: action.payload, loading: false};
  case FETCH_REPORTS_ERRORS:
    error = action.payload || {message: action.payload.message};
    return {...state,  reportsList: [], error: error, loading: false };

  case FETCH_REPORT:
    return {...state, activeReport:null, loading: true};
  case FETCH_REPORT_SUCCESS:
    return {...state, activeReport: action.payload, error:null, loading: false}
  case FETCH_REPORT_ERRORS:
    error = action.payload || {message: action.payload.message};
    return {...state,  activeReport: null, error: error, loading:false}
  case RESET_ACTIVE_REPORT:
    return {...state, activeReport: null, error: null, loading: false}

  case CREATE_REPORT:
  	return {...state, newReport: null, loading: true}
  case CREATE_REPORT_SUCCESS:
  	return {...state, newReport:action.payload, error:null, loading: false}
  case CREATE_REPORT_ERRORS:
    error = action.payload || {message: action.payload.message};
  	return {...state, newReport:null, error:error, loading: false}
  case RESET_NEW_REPORT:
  	return {...state, newReport:null, error:null, loading: false}

  case DELETE_REPORT:
   	return {...state, deletedReport: null, loading: true}
  case DELETE_REPORT_SUCCESS:
  	return {...state, deletedReport:action.payload, error:null, loading: false}
  case DELETE_REPORT_ERRORS:
    error = action.payload || {message: action.payload.message};
  	return {...state, deletedReport: null, error:error, loading: false}
  case RESET_DELETED_REPORT:
  	return {...state,  deletedReport:null, error:null, loading: false}
  default:
    return state;
  }
}
