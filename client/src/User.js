
class User {
  constructor() {
    this._reset();
  }

  isLoggedIn() {
    console.log(`isLoggedIn ${this._isAuthenticated}`);
    return this._isAuthenticated;
  }

  info() {
    return this._email;
  }

  login(signInEmail, signInPassword, cb) {
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
    .then(res => res.json())
    .then(json => {
      // Sign in successful
      if (json.success) {
        this._isAuthenticated = true;
        this._email = json.email;
        cb(null);
      } else {
        cb(json.errorMessage);
      }
    });
  }

  logout(cb) {
    fetch('/api/account/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(json => {
      if (json.success) {
        cb(null);
        this._reset();
      } else {
        cb(json.errorMessage);
      }
    });
  }

  _reset() {
    this._isAuthenticated = false;
    this._email = '';
  }
}

export default new User();
