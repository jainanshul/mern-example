import React, {Component} from 'react';
import {Switch, BrowserRouter, Route} from 'react-router-dom';

import {Home} from './Home';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const About = () => (<h1> This is the about page</h1>);
