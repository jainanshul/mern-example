import React, {Component} from 'react';
import {
  Switch,
  BrowserRouter,
  Route,
} from 'react-router-dom';

import Logout from './Logout';
import Authenticator from './Authenticator';
import PrivateRoute from './PrivateRoute';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/auth' component={Authenticator} />
          <PrivateRoute exact path='/' component={Logout} />
          <PrivateRoute path='/logout' component={Logout} />
        </Switch>
      </BrowserRouter>
    );
  }
}
