import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';


export default class App extends Component {
	componentWillMount() {
    this.props.loadUserFromToken();
  }

  sessionLinks() {
    if (this.props.currentUser === null) {
      return (
        <nav className="login-signup">
          <Link to="/login" activeClassName="current">Login</Link>
          &nbsp;or&nbsp;
          <Link to="/signup" activeClassName="current">Sign up!</Link>
      </nav>)
    } else {
      return (
        <nav>
        <button
          onClick={this.props.resetUser}
          >Logout</button>
				<Link to='/new-expense' >New Expense</Link>
				<Link to='/new-report'>New Report</Link>
      </nav>
    )
    }

  };


  render() {
    return (
      <div>
				<div>{this.sessionLinks()}</div>
        {this.props.children}
      </div>
    );
  }
}
