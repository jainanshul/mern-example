import React, {Component} from 'react';
import {Switch, BrowserRouter, Redirect, Route} from 'react-router-dom';

import user from './User';
import {Logout} from './Logout';
import {Login} from './Login';
import {Register} from './Register';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    user.isLoggedIn()
    ? <Component {...props} />
    : <Redirect to='/login' />
  )} />
);

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
