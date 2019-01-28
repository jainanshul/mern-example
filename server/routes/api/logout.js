module.exports = (app) => { // eslint-disable-line import/no-commonjs
  app.post('/api/account/logout', (req, res) => {
    if (req.session.userId) {
      // Delete session object
      req.session.destroy((err) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Failed to logout'
          });
        } else {
          req.session = null;
          return res.send({
            success: true,
          });
        }
      });
    } else {
      return res.send({
        success: false,
        message: 'No active session exists'
      });
    }
  });
};
