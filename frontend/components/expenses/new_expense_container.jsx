import React,{Component} from 'react';
import {connect} from 'react-redux';
import NewExpense from './new_expense';

function mapStateToProps({}){
    return {};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({},dispatch);
}

export default connect (mapStateToProps,mapDispatchToProps)(NewExpense);
