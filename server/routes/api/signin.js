import {check, validationResult} from 'express-validator/check';

import User from '../../models/user';

const regValidation = [
  check('email')
  .not()
  .isEmpty()
  .withMessage('Email is required')
  .normalizeEmail({lowercase: true})
  .trim(),
  check('password')
  .not()
  .isEmpty()
  .withMessage('Password is required'),
];

module.exports = (app) => { // eslint-disable-line import/no-commonjs
  app.post('/api/account/signin', regValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({
        success: false,
        errorMessage: errors.array().reduce((acc, cur) => `${cur.msg}. ${acc}`, ''),
      });
    }

    const { body } = req;
    const {password, email} = body;

    User.getAuthenticated(email, password, function(err, user, reason) {
      if (err) {
        throw err;
      }

      // Login was successful if we have a user
      if (user) {
        req.session.userId = user._id; // Save the session id
        return res.send({
          success: true,
        });
      }

      // Otherwise we can determine why we failed
      const reasons = User.failedLogin;
      switch (reason) {
      case reasons.NOT_FOUND:
        return res.send({
          success: false,
          errorMessage: 'No such account exists',
        });
      case reasons.PASSWORD_INCORRECT:
        return res.send({
          success: false,
          errorMessage: 'Invalid password',
        });
      case reasons.MAX_ATTEMPTS:
        return res.send({
          success: false,
          errorMessage: 'Max login attempt exceeded. Account is locked.',
        });
      }
    });
  });
};
