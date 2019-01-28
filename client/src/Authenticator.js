// src/Authenticator.js
import React from 'react';
import {css} from 'glamor';
import {withRouter} from 'react-router-dom';

import Login from './Login';
import Register from './Register';

const styles = {
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    width: '100px',
    paddingBottom: '10px',
    cursor: 'pointer',
    borderBottom: '2px solid transparent'
  },
  underline: {
    borderBottomColor: '#ddd'
  }
};

class Authenticator extends React.Component {
  state = {
    showSignIn: true
  }
  switchState = (showSignIn) => {
    this.setState({
      showSignIn
    });
  }
  render() {
    const { showSignIn } = this.state;
    return (
      <div className="col-md-9 col-md-offset-3">
        {
          showSignIn ? (
            <Login />
          ) : (
            <Register />
          )
        }
        <div>
          <p
            {...css(styles.button, showSignIn && styles.underline)}
            onClick={() => this.switchState(true)}
          >Sign In</p>
          <p
            onClick={() => this.switchState(false)}
            {...css(styles.button, !showSignIn && styles.underline)}
          >Sign Up</p>
        </div>
      </div>
    );
  }
}

export default withRouter(Authenticator);
