import React, {Component} from 'react';
import {Switch, BrowserRouter, Route} from 'react-router-dom';

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

const Home = () => (<h1> Hello this is home</h1>);
const About = () => (<h1> This is the about page</h1>);
