import {signUp, logIn, logOut, requestUser} from '../api_util/user_api_util'
import axios from 'axios';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
export const LOGOUT_USER = 'LOGOUT_USER';
export const USER_FROM_TOKEN = 'USER_FROM_TOKEN';
export const SIGN_UP_USER_SUCCESS = 'SIGN_UP_USER_SUCCESS';
export const SIGN_UP_USER = 'SIGN_UP_USER';
export const USER_FROM_TOKEN_SUCCESS = 'USER_FROM_TOKEN_SUCCESS';
export const USER_FROM_TOKEN_FAILURE = 'USER_FROM_TOKEN_FAILURE';

export function signup(user) {
  user.admin = true
  let request = axios.post('/api/users', user)
  return {
    type: SIGN_UP_USER,
    payload: request
  }
}

export function login(user) {
  const request = axios.post(`/api/session`, user)
  return {
    type: LOGIN_USER,
    payload: request
  };
}

export function logout() {
  return {
    type: LOGOUT_USER
  };
}

export function userFromToken(tokenFromStorage) {
  const request = axios({
    method: 'get',
    url: '/api/session',
    headers: { 'token': `${tokenFromStorage}` }
  })

    return {
        type: USER_FROM_TOKEN,
        payload: request
    }
}

export function userFromTokenSuccess(currentUser) {
  return {
    type: USER_FROM_TOKEN_SUCCESS,
    payload: currentUser
  };
}

export function userFromTokenFailure(error) {
  return {
    type: USER_FROM_TOKEN_FAILURE,
    payload: error
  };
}

export function loginUserSuccess(user) {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: user
  };
}

export function loginUserError(error) {
  return {
    type: LOGIN_USER_ERROR,
    payload: error
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER
  };
}

export const signUpUserSuccess = user => ({
  type: SIGN_UP_USER_SUCCESS,
  payload: user
});

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});
