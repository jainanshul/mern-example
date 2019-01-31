import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from 'reactstrap';

import user from './User';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      error: '',
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }

  logout = () => {
    this.setState({
      isLoading: true,
      error: '',
    });

    try {
      user.logout();
      this.setState({
        isLoading: false
      });

      // Go to login screen
      this.props.history.push('/login');
    } catch(error) {
      this.setState({
        isLoading: false,
        error: error.message,
      });
    }
  }

  render() {
    const {isLoading, error} = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>
             Signed in as: <span style={{color: 'blue'}}>{user.info()}</span>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Button color="primary" onClick={this.logout}>Logout</Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        {error &&
          <div className={'alert alert-danger'}>{error}</div>
        }
      </div>
    );
  }
}

export default withRouter(Header);
