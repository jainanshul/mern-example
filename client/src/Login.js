import React from 'react';

import user from './User';

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signInEmail: '',
      signInPassword: '',
      isLoading: false,
      error: ''
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({
      isLoading: true,
      error: '',
    });
    const { signInEmail, signInPassword } = this.state;

    user.login(signInEmail, signInPassword)
    .then(() => {
      this.setState({
        isLoading: false,
        signInPassword: '',
        signInEmail: '',
      });

      // Go to logout screen
      this.props.history.push('/logout');
    })
    .catch((error) => {
      this.setState({
        error: error.message,
        isLoading: false,
      });
    });
  }

  render() {
    const { username, password, isLoading, error } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Login</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={'form-group'}>
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" name="signInEmail" value={username} onChange={this.handleChange} />
          </div>
          <div className={'form-group'}>
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="signInPassword" value={password} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" disabled={isLoading}>Login</button>
          </div>
          {error &&
            <div className={'alert alert-danger'}>{error}</div>
          }
        </form>
      </div>
    );
  }
}
