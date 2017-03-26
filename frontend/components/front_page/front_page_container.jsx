import React, { Component } from 'react';
import { connect } from 'react-redux';
import FrontPage from './front_page';

const mapStateToProps = ({ session }) => ({
  currentUser: session.user
});

const mapDispatchToProps = (dispatch) => {
  return {

  };
};


export default connect(mapStateToProps, mapDispatchToProps)(FrontPage);
