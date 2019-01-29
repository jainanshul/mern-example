import {check, validationResult} from 'express-validator/check';

import User from '../../models/user';
import {getToken, validateToken} from '../../utils';

const loginValidation = [
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

const registerValidation = [
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

async function login(req, res) {
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
      return res.status(200).send({
        user: user,
        token: getToken(user),
      });
    }
  } catch(error) {
    return res.status(401).send({
      errorMessage: error.message,
    });
  }
}

async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errorMessage: errors.array().reduce((acc, cur) => `${cur.msg}. ${acc}`, ''),
    });
  }

  try {
    // Save the new user
    const {password, email} = req.body;
    const user = new User();
    user.email = email;
    user.password = user.generateHash(password);
    await user.save();

    // Set the location header
    res.location(`/user/:${user._id}`);

    return res.status(201).send({
      user: user,
      token: getToken(user),
    });
  } catch(error) {
    return res.status(400).send({
      errorMessage: error.message,
    });
  }
}

async function getAll(req, res) {
  const {body} = req;

  try {
    if (body) {
      const users = await User.find({}).exec();
      return res.status(200).send({
        users: users,
      });
    } else {
      return res.status(403).send({
        errorMessage: `User is not authorized to perform this action`,
      });
    }
  } catch(error) {
    return res.status(500).send({
      errorMessage: error.message,
    });
  }
}

async function getCurrent(req, res) {
  const {body} = req;

  try {
    const user = await User.findOne({email: body.user}).exec();
    return res.status(200).send({
      user: user,
    });
  } catch(error) {
    return res.status(500).send({
      errorMessage: error.message,
    });
  }
}

module.exports = (app) => { // eslint-disable-line import/no-commonjs
  app.post('/user/login', loginValidation, (req, res) => login(req, res));
  app.post('/user', registerValidation, (req, res) => register(req, res));
  app.get('/user', validateToken, (req, res) => getCurrent(req, res));
  app.get('/users', validateToken, (req, res) => getAll(req, res));
};
