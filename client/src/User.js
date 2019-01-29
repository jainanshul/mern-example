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

  login(email, password) {
    return fetch('/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
    .then((res) => this._fetchHandler(res))
    .then((json) => {
      this._email = json.email; // Login successful
    });
  }

  logout() {
    return fetch('/user/logout', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    })
    .then((res) => this._fetchHandler(res))
    .then(() => {
      this._reset(); // Logout successful
    });
  }

  register(email, password) {
    return fetch('/user', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
    .then((res) => this._fetchHandler(res))
    .then((json) => {
      this._email = json.email; // Registration successful
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

  _fetchHandler(response) {
    if (response.ok) {
      return response.json().then((json) => {
        // The status was ok and there is a json body
        return Promise.resolve(json);
      }).catch(() => {
        // The status was ok but there is no json body
        return Promise.resolve(null);
      });
    } else {
      return response.json().catch(() => {
        // The status was not ok and there is no json body
        throw new Error(response.statusText);
      }).then(json => {
        // The status was not ok but there is a json body
        throw new Error(json.errorMessage);
      });
    }
  }
}

export default new User();
