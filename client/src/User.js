class User {
  constructor() {
    this._reset();
  }

  info() {
    return this._user ? this._user.email : '';
  }

  async login(email, password) {
    const res = await fetch('/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const json = await this._fetchHandler(res);

    // Login successful; store the user and the JWT token
    localStorage.setItem('jwtToken', json.token);
    this._user = json.user;
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this._reset();
  }

  async register(email, password, role) {
    const res = await fetch('/user', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password,
        role: role,
      }),
    });

    const json = await this._fetchHandler(res);

    // Registration successful; store the user and the JWT token
    localStorage.setItem('jwtToken', json.token);
    this._user = json.user;
  }

  async getCurrentUser() {
    const res = await fetch('/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
        'Content-Type': 'application/json',
      },
    });

    const json = await this._fetchHandler(res);
    this._user = json.user;
  }

  async getAllUsers() {
    const res = await fetch('/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
        'Content-Type': 'application/json',
      },
    });

    const json = await this._fetchHandler(res);
    return json.users;
  }

  _reset() {
    this._user = null;
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
