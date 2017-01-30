import {
  USER_FROM_TOKEN,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER,
  SIGN_UP_USER_ERROR,
  USER_FROM_TOKEN_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER
 } from '../actions/session_actions';
import merge from 'lodash/merge';

const INITIAL_STATE = {user: null, status:null, error:null, loading: false};

const SessionReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case USER_FROM_TOKEN:
      return { user: null, status:'token-user', error: null, loading: true}
    case USER_FROM_TOKEN_SUCCESS:
      return { user: action.user, status:'authenticated', error:null, loading: false};
    case SIGN_UP_USER:
      return { user: null, status:'signup', error:null, loading: true};
    case SIGN_UP_USER_SUCCESS:
      return { user: action.payload.user, status:'authenticated', error:null, loading: false};
    case SIGN_UP_USER_ERROR:
    return { user: null, status:'signup-error', error:action.payload.error, loading: false};
    case LOGIN_USER:
      return { user: null, status:'login', error:null, loading: true};
    case LOGIN_USER_SUCCESS:
      return { user: action.payload.user, status:'authenticated', error:null, loading: false};
    case LOGIN_USER_ERROR:
      return { user: null, status:'login-error', error:action.payload.error, loading: false};
    case LOGOUT_USER:
      return { user: null, status:'log-out', error:null, loading: false};
    default:
      return state;
  }
};

export default SessionReducer;
