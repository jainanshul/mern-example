class User {
  constructor() {
    this._reset();
  }

  isLoggedIn() {
    return this._getCurrentSession();
  }

  info() {
    return this._email;
  }

  login(signInEmail, signInPassword) {
    return fetch('/api/account/signin', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
    .then(res => res.json())
    .then(json => {
      // Sign in successful
      if (json.success) {
        this._email = json.email;
      } else {
        throw new Error(json.errorMessage);
      }
    });
  }

  logout() {
    return fetch('/api/account/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(json => {
      if (json.success) {
        this._reset();
      } else {
        throw new Error(json.errorMessage);
      }
    });
  }

  _getCurrentSession() {
    return fetch('/api/account/session', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    })
    .then(res => res.json())
    .then(json => {
      // Has valid session
      if (json.success) {
        this._email = json.email;
      } else {
        throw new Error(json.errorMessage);
      }
    });
  }

  _reset() {
    this._email = '';
  }
}

export default new User();
