
class User {
  constructor() {
    this.isAuthenticated = false;
  }

  isLoggedIn() {
    console.log(`isLoggedIn ${this.isAuthenticated}`);
    return this.isAuthenticated;
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
        this.isAuthenticated = true;
        cb(null);
      } else {
        cb(json.message);
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
        this.isAuthenticated = false;
      } else {
        cb(json.message);
      }
    });
  }
}

export default new User();
