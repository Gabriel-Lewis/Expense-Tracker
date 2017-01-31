import axios from 'axios';


export const FETCH_REPORTS = 'FETCH_REPORTS';
export const FETCH_REPORTS_SUCCESS = 'FETCH_REPORTS_SUCCESS';
export const FETCH_REPORTS_FAILURE = 'FETCH_REPORTS_FAILURE';
export const RESET_REPORTS = 'RESET_REPORTS';


export const CREATE_REPORT = 'CREATE_REPORT';
export const CREATE_REPORT_SUCCESS = 'CREATE_REPORT_SUCCESS';
export const CREATE_REPORT_FAILURE = 'CREATE_REPORT_FAILURE';

export const UPDATE_REPORT = 'UPDATE_REPORT';
export const UPDATE_REPORT_SUCCESS = 'UPDATE_REPORT_SUCCESS';
export const UPDATE_REPORT_FAILURE = 'UPDATE_REPORT_FAILURE';
export const RESET_NEW_REPORT = 'RESET_NEW_REPORT';

export const FETCH_REPORT = 'FETCH_REPORT';
export const FETCH_REPORT_SUCCESS = 'FETCH_REPORT_SUCCESS';
export const FETCH_REPORT_FAILURE = 'FETCH_REPORT_FAILURE';
export const RESET_ACTIVE_REPORT = 'RESET_ACTIVE_REPORT';

export const DELETE_REPORT = 'DELETE_REPORT';
export const DELETE_REPORT_SUCCESS = 'DELETE_REPORT_SUCCESS';
export const DELETE_REPORT_FAILURE = 'DELETE_REPORT_FAILURE';
export const RESET_DELETED_REPORT = 'RESET_DELETED_REPORT';



const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

export function fetchReports(token) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/reports`,
    headers: {
    'token': `${token}`
  }
  });

  return {
    type: FETCH_REPORTS,
    payload: request
  };
}

export function fetchReportsSuccess(reports) {
  return {
    type: FETCH_REPORTS_SUCCESS,
    payload: reports
  };
}

export function fetchReportsFailure(error) {
  return {
    type: FETCH_REPORTS_FAILURE,
    payload: error
  };
}


export function createReport(props, tokenFromStorage) {
  const request = axios({
    method: 'post',
    data: props,
    url: `${ROOT_URL}/reports`,
    headers: {
      'token': `${tokenFromStorage}`
    }
  });

  return {
    type: CREATE_REPORT,
    payload: request
  };
}

export function createReportSuccess(newReport) {
  return {
    type: CREATE_REPORT_SUCCESS,
    payload: newReport
  };
}

export function createReportFailure(error) {
  return {
    type: CREATE_REPORT_FAILURE,
    payload: error
  };
}

export function updateReport(expense, token) {
  const request = axios({
    method: 'put',
    data: expense,
    url: `${ROOT_URL}/reports/${expense._id}`,
    headers: {
      'token': `${token}`
    }
  });

  return {
    type: UPDATE_REPORT,
    payload: request
  };
}

export function updateReportSuccess(expense) {
  return {
    type: UPDATE_REPORT_SUCCESS,
    payload: expense
  };
}

export function resetNewReport() {
  return {
    type: RESET_NEW_REPORT
  }
}
;

export function resetDeletedReport() {
  return {
    type: RESET_DELETED_REPORT
  }
};

export function fetchReport(id, token) {
  const request = axios({
    url: `${ROOT_URL}/reports/${id}`,
    method: 'get',
    headers: { 'token': token }
  })

  return {
    type: FETCH_REPORT,
    payload: request
  };
}


export function fetchReportSuccess(activeReport) {
  return {
    type: FETCH_REPORT_SUCCESS,
    payload: activeReport
  };
}

export function fetchReportFailure(error) {
  return {
    type: FETCH_REPORT_FAILURE,
    payload: error
  };
}

export function resetActiveReport() {
  return {
    type: RESET_ACTIVE_REPORT
  }
}


export function deleteReport(id, token) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/reports/${id}`,
    headers: {
      'token': `${token}`
    }
  });
  return {
    type: DELETE_REPORT,
    payload: request
  };
}

export function deleteReportSuccess(deletedReport) {
  return {
    type: DELETE_REPORT_SUCCESS,
    payload: deletedReport
  };
}

export function deleteReportFailure(response) {
  return {
    type: DELETE_REPORT_FAILURE,
    payload: response
  };
}
