import React from 'react';
import {withRouter} from 'react-router-dom';
import {Grid, Row, Col} from 'react-bootstrap';

import user from './User';

class Login extends React.Component {
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

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({
      isLoading: true,
      error: '',
    });
    const { signInEmail, signInPassword } = this.state;

    try {
      await user.login(signInEmail, signInPassword);
      this.setState({
        isLoading: false,
        signInPassword: '',
        signInEmail: '',
      });

      // Go to home
      this.props.history.push('/');
    } catch(error) {
      this.setState({
        error: error.message,
        isLoading: false,
      });
    }
  }

  render() {
    const { username, password, isLoading, error } = this.state;
    return (
      <Grid>
        <Row><Col><h2>Login</h2></Col></Row>
        <Row>
          <Col>
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
            </form>
          </Col>
        </Row>
        <Row>
          <Col>
            {error &&
              <div className={'alert alert-danger'}>{error}</div>
            }
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default withRouter(Login);
