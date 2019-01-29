import React from 'react';
import {withRouter} from 'react-router-dom';
import {Jumbotron, Button} from 'react-bootstrap';

class Page404 extends React.Component {
  handleClick = () => {
    this.props.history.push('/');
  }

  render() {
    const {location} = this.props;
    return (
      <Jumbotron>
        <h1>Oops! That page can’t be found.</h1>
        <p>
          No match found for <code>{location.pathname}</code>
        </p>
        <p>
          <Button bsStyle="primary" onClick={this.handleClick}>Home Page</Button>
        </p>
      </Jumbotron>
    );
  }
}

export default withRouter(Page404);
