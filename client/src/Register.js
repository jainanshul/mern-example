import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

import user from './User';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
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
    const { email, password } = this.state;

    user.register(email, password)
    .then(() => {
      this.setState({
        isLoading: false,
        email: '',
        password: '',
      });

      // Go to home
      this.props.history.push('/');
    })
    .catch((error) => {
      this.setState({
        error: error.message,
        isLoading: false,
      });
    });
  }

  render() {
    const {username, password, isLoading, error} = this.state;
    return (
      <Grid>
        <Row><Col><h2>Register</h2></Col></Row>
        <Row>
          <Col>
            <form name="form" onSubmit={this.handleSubmit}>
              <div className={'form-group'}>
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" name="email" value={username} onChange={this.handleChange} />
              </div>
              <div className={'form-group'}>
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <button className="btn btn-primary" disabled={isLoading}>Register</button>
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

export default withRouter(Register);
