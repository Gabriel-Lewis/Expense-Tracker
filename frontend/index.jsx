import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store';
import routes from './routes';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import { userFromToken, userFromTokenSuccess, resetToken, logout } from './actions/session_actions';


const loadUserFromToken = () => {
 let token = localStorage.getItem('jwtToken');
   if(!token || token === '') {
     return;
   }
   store.dispatch(userFromToken(token))
     .then((response) => {
       store.dispatch(userFromTokenSuccess(response.payload))
   })
 }

document.addEventListener('DOMContentLoaded', () => {
    const main = document.getElementById('main');
    loadUserFromToken()
    ReactDOM.render(
      <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
      </Provider>, main);
});
