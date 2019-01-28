// src/Authenticator.js
import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {withRouter, Link} from 'react-router-dom';

import Login from './Login';

class Authenticator extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col>
            <Login />
          </Col>
        </Row>
        <Row>
          <Col>
            <Link to={'/register'}>To create a new user click here</Link>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default withRouter(Authenticator);
