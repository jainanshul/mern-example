import React, {Component} from 'react';

export class Logout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      logoutError: '',
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }

  logout = () => {
    this.setState({
      isLoading: true,
      logoutError: '',
    });

    fetch('/api/account/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(json => {
      if (json.success) {
        this.setState({
          isLoading: false
        });

        // Go to login screen
        this.props.history.push("/");
      } else {
        this.setState({
          isLoading: false,
          logoutError: json.message,
        });
      }
    });
  }

  render() {
    const {
      isLoading,
      logoutError,
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    return (
      <div>
        {
          (logoutError) ? (
            <p>{logoutError}</p>
          ) : (null)
        }
        <p>Profile</p>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}
