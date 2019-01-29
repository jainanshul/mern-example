import React from 'react';
import {
  Redirect,
  Route,
  withRouter,
} from 'react-router-dom';

import user from './User';

class PrivateRoute extends React.Component {
  state = {
    loaded: false,
    isAuthenticated: false
  }
  componentDidMount() {
    this._authenticate();
    this.unlisten = this.props.history.listen(() => {
      user.isLoggedIn()
      .catch(() => {
        if (this.state.isAuthenticated) {
          this.setState({isAuthenticated: false});
        }
      });
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  async _authenticate() {
    try {
      await user.getCurrentUser();
      console.log(`Has an active session`);
      this.setState({loaded: true, isAuthenticated: true});
    } catch(error) {
      console.log(`Invalid session. ${error}`);
      this.props.history.push('/login');
    }
  }

  render() {
    const {component: Component, ...rest} = this.props;
    const {loaded , isAuthenticated} = this.state;

    if (!loaded) {
      return null;
    }

    return (
      <Route
        {...rest}
        render={props => {
          return isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
              }}
            />
          );
        }}
      />
    );
  }
}

export default withRouter(PrivateRoute);
