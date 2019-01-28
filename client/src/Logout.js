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

    user.logout((error) => {
      if (error) {
        this.setState({
          isLoading: false,
          error: error,
        });
      } else {
        this.setState({
          isLoading: false
        });

        // Go to login screen
        this.props.history.push("/login");
      }
    })
  }

  render() {
    const {
      isLoading,
      error,
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    return (
      <div>
        {
          (error) ? (
            <p>{error}</p>
          ) : (null)
        }
        <p>Profile</p>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}
