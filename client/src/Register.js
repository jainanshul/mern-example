import React from 'react';

export class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signUpEmail: '',
      signUpPassword: '',
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
    const { signUpEmail, signUpPassword } = this.state;

    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
      }),
    })
    .then(res => res.json())
    .then(json => {
      if (json.success) {
        this.setState({
          isLoading: false,
          signUpEmail: '',
          signUpPassword: '',
        });
      } else {
        this.setState({
          error: json.message,
          isLoading: false,
        });
      }
    });
  }

  render() {
    const { username, password, isLoading, error } = this.state;
     return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Register</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={'form-group'}>
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" name="signUpEmail" value={username} onChange={this.handleChange} />
          </div>
          <div className={'form-group'}>
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="signUpPassword" value={password} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" disabled={isLoading}>Register</button>
          </div>
          {error &&
            <div className={'alert alert-danger'}>{error}</div>
          }
        </form>
      </div>
    );
  }
}
