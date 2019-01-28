import React, {Component} from 'react';
import {
  Switch,
  BrowserRouter,
  Route,
} from 'react-router-dom';

import {Logout} from './Logout';
import {Login} from './Login';
import {Register} from './Register';
import PrivateRoute from './PrivateRoute';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute path='/register' component={Register} />
          <PrivateRoute path='/logout' component={Logout} />
        </Switch>
      </BrowserRouter>
    );
  }
}
