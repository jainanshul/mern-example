// src/Authenticator.js
import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import {withRouter, Link} from 'react-router-dom';

import Login from './Login';

class Authenticator extends React.Component {
  render() {
    return (
      <Container>
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
      </Container>
    );
  }
}

export default withRouter(Authenticator);
