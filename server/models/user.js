import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const MAX_LOGIN_ATTEMPTS = 5; // Max login attempts
const LOCK_TIME = 10 * 1000; // 10 secs lock

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: { unique: true },
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  signUpDate: {
    type: Date,
    default: Date.now()
  },
  loginAttempts: {
    type: Number,
    required: true,
    default: 0
  },
  lockUntil: {
    type: Number
  },
});

UserSchema.statics.failedLogin = {
  NOT_FOUND: 0,
  PASSWORD_INCORRECT: 1,
  MAX_ATTEMPTS: 2
};

UserSchema.virtual('isLocked').get(function() {
  // Check for a future lockUntil timestamp
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.update({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 }
    }).exec();
  }

  // Otherwise we're incrementing
  const updates = { $inc: { loginAttempts: 1 } };

  // Lock the account if we've reached max attempts and it's not locked already
  if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + LOCK_TIME };
  }

  return this.update(updates).exec();
};

UserSchema.statics.getAuthenticated = async function(email, password) {
  // Make sure the user exists
  const user = await this.findOne({email: email}).exec();
  if (!user) {
    throw new Error('No such user found');
  }

  // Check if the account is currently locked
  if (user.isLocked) {
    // Just increment login attempts if account is already locked
    await user.incLoginAttempts();
    throw new Error('Max login attempt exceeded. Account is locked.');
  }

  // Test for a matching password
  if (!user.validPassword(password)) {
    // Password is incorrect, so increment login attempts before responding
    await user.incLoginAttempts();
    throw new Error('Invalid password');
  }

  // If there's no lock or failed attempts, just return the user
  if (!user.loginAttempts && !user.lockUntil) {
    return user;
  } else {
    // Reset attempts and lock info
    var updates = {
      $set: { loginAttempts: 0 },
      $unset: { lockUntil: 1 }
    };

    await user.update(updates).exec();
    return user;
  }
};

export default mongoose.model('User', UserSchema);
