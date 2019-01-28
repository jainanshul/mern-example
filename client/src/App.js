import React, {Component} from 'react';
import {Switch, BrowserRouter, Route} from 'react-router-dom';

import {Home} from './Home';
import {Logout} from './Logout';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/logout' component={Logout} />
        </Switch>
      </BrowserRouter>
    );
  }
}
