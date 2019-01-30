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
      <Container>
        <Row><Col><h2>Login</h2></Col></Row>
        <Row>
          <Col>
            <Form name="form" onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input type="text" name="signInEmail" value={username} onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="signInPassword" value={password} onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Button color="primary" disabled={isLoading}>Login</Button>
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

export default withRouter(Login);
