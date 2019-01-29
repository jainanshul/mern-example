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
  app.post('/user', regValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        errorMessage: errors.array().reduce((acc, cur) => `${cur.msg}. ${acc}`, ''),
      });
    }

    try {
      // Save the new user
      const {password, email} = req.body;
      const newUser = new User();
      newUser.email = email;
      newUser.password = newUser.generateHash(password);
      await newUser.save();

      // Save the session id
      req.session.userId = newUser._id;

      // Set the location header
      res.location(`/user/:${newUser._id}`);

      return res.status(201).send({
        email: newUser.email,
      });
    } catch(error) {
      return res.status(400).send({
        errorMessage: error.message,
      });
    }
  });
};
