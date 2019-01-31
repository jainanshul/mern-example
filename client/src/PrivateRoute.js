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
  }

  async _authenticate() {
    try {
      await user.getCurrentUser();
      this.setState({loaded: true, isAuthenticated: true});
    } catch(error) {
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
