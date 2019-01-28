import User from '../../models/user';

module.exports = (app) => { // eslint-disable-line import/no-commonjs
  app.post('/api/account/session', (req, res) => {
    if (req.session.userId) {
      User.findOne({ _id: req.session.userId }, function(err, user) {
        if (err) {
          return res.send({
            success: false,
            errorMessage: err,
          });
        }

        // Make sure the user exists
        if (!user) {
          return res.send({
            success: false,
            errorMessage: 'Invalid user for the session',
          });
        }

        return res.send({
          success: true,
          email: user.email,
        });
      });
    } else {
      return res.send({
        success: false,
        errorMessage: 'No active session exists'
      });
    }
  });
};
