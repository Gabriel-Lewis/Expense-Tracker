import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';


export default class App extends Component {

  sessionLinks() {
    if (this.props.currentUser === null) {
      return (
        <nav className="login-signup">
					<div className="logo">
						<Link to="/"><h3>Expense Tracker</h3></Link>
					</div>
					<div className="links">
            <Link to="/login" activeClassName="current">Login</Link>
            <Link to="/signup" activeClassName="current">Sign up!</Link>
					</div>
      </nav>)
    } else {
      return (
        <nav>
					<div className="logo">
						<Link to="/"><h3>Expense Tracker</h3></Link>
					</div>
					<div className="links">
						<Link to='/new-expense'>New Expense</Link>
						<Link to='/new-report'>New Report</Link>
	        <button
	          onClick={this.props.resetUser}
	          >Logout</button>
				</div>
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
