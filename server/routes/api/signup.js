import {check, validationResult} from 'express-validator/check';

import User from '../../models/user';

const regValidation = [
  check('email')
  .not()
  .isEmpty()
  .withMessage('Email is required')
  .isEmail()
  .withMessage('Email should be an email address')
  .normalizeEmail({lowercase: true})
  .trim(),
  check('password')
  .not()
  .isEmpty()
  .withMessage('Password is required')
  .isLength({min: 8})
  .withMessage('Password should be at least 8 characters'),
  check('email').custom(value => {
    return User.findOne({email: value}).then((user) => {
      if (user) {
        throw new Error('This email is already in use');
      }
    });
  })
];

module.exports = (app) => { // eslint-disable-line import/no-commonjs
  /*
   * Sign up
   */
  app.post('/api/account/signup', regValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({
        success: false,
        message: errors.array().reduce((acc, cur) => `${cur.msg}. ${acc}`, ''),
      });
    }

    const {body} = req;
    const {password, email} = body;

    // Save the new user
    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.generateHash(password);
    newUser.save((err) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send({
        success: true,
        message: 'Signed up'
      });
    });
  });
};
