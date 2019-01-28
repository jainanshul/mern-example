import React, {Component} from 'react';

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }

  onTextboxChangeSignInEmail = (event) => {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword = (event) => {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpEmail = (event) => {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword = (event) => {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onSignUp = () => {
    // Grab state
    const {
      signUpEmail,
      signUpPassword,
    } = this.state;

    this.setState({
      isLoading: true,
      signUpError: '',
    });

    // Post request to backend
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
      }),
    }).then(res => res.json())
    .then(json => {
      console.log('json', json);
      if (json.success) {
        this.setState({
          signUpError: json.message,
          isLoading: false,
          signUpEmail: '',
          signUpPassword: '',
        });
      } else {
        this.setState({
          signUpError: json.message,
          isLoading: false,
        });
      }
    });
  }

  onSignIn = () => {
    // Grab state
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true,
      signInError: '',
    });

    // Post request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        // Sign in successful
        if (json.success) {
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
          });

          // Go to logout screen
          this.props.history.push("/logout");
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }

  render() {
    const {
      isLoading,
      signInError,
      signInEmail,
      signInPassword,
      signUpEmail,
      signUpPassword,
      signUpError,
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    return (
      <div>
        <div>
          {
            (signInError) ? (
              <p>{signInError}</p>
            ) : (null)
          }
          <p>Sign In</p>
          <input
            type="email"
            placeholder="Email"
            value={signInEmail}
            onChange={this.onTextboxChangeSignInEmail}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={signInPassword}
            onChange={this.onTextboxChangeSignInPassword}
          />
          <br />
          <button onClick={this.onSignIn}>Sign In</button>
        </div>
        <br />
        <br />
        <div>
          {
            (signUpError) ? (
              <p>{signUpError}</p>
            ) : (null)
          }
          <p>Sign Up</p>
          <input
            type="email"
            placeholder="Email"
            value={signUpEmail}
            onChange={this.onTextboxChangeSignUpEmail}
          /><br />
          <input
            type="password"
            placeholder="Password"
            value={signUpPassword}
            onChange={this.onTextboxChangeSignUpPassword}
          /><br />
          <button onClick={this.onSignUp}>Sign Up</button>
        </div>

      </div>
    );
  }
}
