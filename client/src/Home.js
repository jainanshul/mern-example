import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import Header from './Header';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
    };
  }

  render() {
    const {error} = this.state;

    return (
      <div>
        <Header/>
        {error &&
          <div className={'alert alert-danger'}>{error}</div>
        }
      </div>
    );
  }
}

export default withRouter(Home);
