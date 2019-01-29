module.exports = (app) => { // eslint-disable-line import/no-commonjs
  app.post('/user/logout', (req, res) => {
    if (req.session.userId) {
      // Delete session object
      req.session.destroy((err) => {
        if (err) {
          return res.status(400).send({
            errorMessage: 'Failed to logout'
          });
        } else {
          req.session = null;
          return res.status(204).send({
          });
        }
      });
    } else {
      // No active session exists; user is already logged out
      return res.status(204).send({
      });
    }
  });
};
