import React from 'react';
import { Link, withRouter, browswerHistory } from 'react-router';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', admin: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidUpdate() {
    this.redirectIfLoggedIn();
  }

  redirectIfLoggedIn() {
    if (this.props.loggedIn) {
      this.props.router.push('/');
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    if (this.props.formType === 'login') {
      return this.props.login(user);
    }
    return this.props.signup(user);

  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.checked;
    this.setState({ admin: value });
  }

  navLink() {
    if (this.props.formType === 'login') {
      return <Link to="/signup">sign up instead</Link>;
    }
    return <Link to="/login">log in instead</Link>;

  }

  adminBox() {
    if (this.props.formType === 'login') {
      return (<div />);
    }
    return (
				<label>Admin
					<br />
					<input
  type="checkbox"
  checked={this.state.admin}
  onChange={this.handleInputChange} /></label>
    );

  }

  renderErrors() {
    return (
			<ul>
				{this.props.error.map((error, i) => (
					<li key={`error-${i}`}>
						{error}
					</li>
				))}
			</ul>
    );
  }

  render() {
    return (
			<div className="login-form-container">
				<form onSubmit={this.handleSubmit} className="login-form-box">
					<p>Welcome to Expense Tracker!
					<br />
					Please {this.props.formType} or {this.navLink()}</p>
					<div className="login-form">
						<label> Email
							<br />
							<input type="text"
  value={this.state.email}
  onChange={this.update('email')}
  className="login-input" />
						</label>
						<label> Password
							<input type="password"
  value={this.state.password}
  onChange={this.update('password')}
  className="login-input" />
						</label>
						{this.adminBox()}
						<input className="login-button" type="submit" value="Submit" />
					</div>
				</form>
			</div>
    );
  }

}

export default withRouter(SessionForm);
