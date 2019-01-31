import React from 'react';
import {withRouter} from 'react-router-dom';
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';

import user from './User';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLoading: false,
      role: 'user',
      error: ''
    };
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({
      isLoading: true,
      error: '',
    });

    const {email, password, role} = this.state;
    try {
      await user.register(email, password, role);
      this.setState({
        isLoading: false,
        email: '',
        password: '',
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
    const {username, password, role, isLoading, error} = this.state;
    return (
      <Container>
        <Row><Col><h2>Register</h2></Col></Row>
        <Row>
          <Col>
            <Form name="form" onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input type="text" name="email" value={username} onChange={this.handleChange}/>
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" value={password} onChange={this.handleChange}/>
              </FormGroup>
              <FormGroup>
                <Label for="role">Roles</Label>
                <Input type="select" name="role" value={role} onChange={this.handleChange}>
                  <option>user</option>
                  <option>admin</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Button color="primary" disabled={isLoading}>Register</Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            {error &&
              <Alert color="danger">{error}</Alert>
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Register);
