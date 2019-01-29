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
  app.post('/user/login', regValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        errorMessage: errors.array().reduce((acc, cur) => `${cur.msg}. ${acc}`, ''),
      });
    }

    try {
      const {password, email} = req.body;
      const user = await User.getAuthenticated(email, password);

      // Login was successful if we have a user
      if (user) {
        req.session.userId = user._id; // Save the session id

        return res.status(200).send({
          email: user.email,
        });
      }
    } catch(error) {
      return res.status(401).send({
        errorMessage: error.message,
      });
    }
  });
};
