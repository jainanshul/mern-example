import React, {Component} from 'react';

import user from './User';

export class Logout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      error: '',
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
      error: '',
    });

    user.logout()
    .then(() => {
      this.setState({
        isLoading: false
      });

      // Go to login screen
      this.props.history.push('/login');
    })
    .catch((error) => {
      this.setState({
        isLoading: false,
        error: error.message,
      });
    });
  }

  render() {
    const {isLoading, error} = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>User {user.info()}</h2>
        <button className="btn btn-primary" disabled={isLoading} onClick={this.logout}>Logout</button>
        {error &&
          <div className={'alert alert-danger'}>{error}</div>
        }
      </div>
    );
  }
}
