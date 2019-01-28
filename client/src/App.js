import React, {Component} from 'react';
import {Switch, BrowserRouter, Route} from 'react-router-dom';

import {Logout} from './Logout';
import {Login} from './Login';
import {Register} from './Register';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/logout' component={Logout} />
        </Switch>
      </BrowserRouter>
    );
  }
}
