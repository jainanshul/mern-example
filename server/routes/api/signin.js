import {check, validationResult} from 'express-validator/check';

import User from '../../models/user';
import UserSession from '../../models/user_session';

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
        message: errors.array().reduce((acc, cur) => `${cur.msg}. ${acc}`, ''),
      });
    }

    const { body } = req;
    const {password, email} = body;

    User.find({
      email: email
    }, (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }

      if (!users || users.length <= 0) {
        return res.send({
          success: false,
          message: 'No such account exists'
        });
      }

      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: 'Invalid password'
        });
      }
      // Otherwise correct user
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: 'Error: server error'
          });
        }
        return res.send({
          success: true,
          message: 'Valid sign in',
          token: doc._id
        });
      });
    });
  });
};
