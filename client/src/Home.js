import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {
  Button,
  Col,
  Container,
  Row,
  Table,
} from 'reactstrap';

import Header from './Header';
import user from './User';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      users: null,
    };
  }

  handleAdmin = async () => {
    try {
      const users = await user.getAllUsers();
      this.setState({users: users});
    } catch(error) {
      this.setState({
        error: error.message,
      });
    }
  }

  render() {
    const {error, users} = this.state;

    const userList = users ? users.map((user, i) => (
      <tr key={i}>
        <td>{user.email}</td>
        <td>{user.role.name}</td>
        <td>{user.loginAttempts}</td>
        <td>{new Date(user.signUpDate).toDateString()}</td>
        <td>{user.lockUntil ? new Date(user.lockUntil).toString() : ''}</td>
      </tr>
    )) : null;

    return (
      <div>
        <Header/>
        <Container fluid style={{padding: 10}}>
          <Row style={{padding: 10}}>
            <Col>
              <Button color="primary" onClick={this.handleAdmin}>Admin</Button>
            </Col>
          </Row>
          {userList &&
            <Row style={{padding: 10}}>
              <Col>
                <Table striped>
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Login attempts</th>
                      <th>Sign up date</th>
                      <th>Locked until</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList}
                  </tbody>
                </Table>
              </Col>
            </Row>
          }
        </Container>
        {error &&
          <div className={'alert alert-danger'}>{error}</div>
        }
      </div>
    );
  }
}

export default withRouter(Home);
