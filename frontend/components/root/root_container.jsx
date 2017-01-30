import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userFromToken, userFromTokenSuccess, resetToken, logout } from '../../actions/session_actions';
import Root from './root';

const mapStateToProps = ({session}) => ({
  currentUser: session.user
})

const mapDispatchToProps = (dispatch) => {
  return {
  	 loadUserFromToken: () => {
  	 	let token = localStorage.getItem('jwtToken');
  	 	if(!token || token === '') {
  	 		return;
  	 	}
      dispatch(userFromToken(token))
        .then((response) => {
          dispatch(userFromTokenSuccess(response.payload.data.user))
      })
  	 },
     resetUser: () => {
     	localStorage.removeItem('jwtToken');
     	dispatch(logout());
     }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Root);
