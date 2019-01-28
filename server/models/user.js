import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const MAX_LOGIN_ATTEMPTS = 5; // Max login attempts
const LOCK_TIME = 10 * 1000; // 10 secs lock

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: { unique: true },
    default: ''
  },
  password: {
    type: String,
    required: true,
    default: ''
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

const reasons = UserSchema.statics.failedLogin = {
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

UserSchema.methods.incLoginAttempts = function(cb) {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.update({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 }
    }, cb);
  }

  // Otherwise we're incrementing
  const updates = { $inc: { loginAttempts: 1 } };

  // Lock the account if we've reached max attempts and it's not locked already
  if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + LOCK_TIME };
  }

  return this.update(updates, cb);
};

UserSchema.statics.getAuthenticated = function(email, password, cb) {
  this.findOne({ email: email }, function(err, user) {
    if (err) {
      return cb(err);
    }

    // Make sure the user exists
    if (!user) {
      return cb(null, null, reasons.NOT_FOUND);
    }

    // Check if the account is currently locked
    if (user.isLocked) {
      // Just increment login attempts if account is already locked
      return user.incLoginAttempts(function(err) {
        if (err) {
          return cb(err);
        }

        return cb(null, null, reasons.MAX_ATTEMPTS);
      });
    }

    // Test for a matching password
    if (!user.validPassword(password)) {
      // Password is incorrect, so increment login attempts before responding
      user.incLoginAttempts(function(err) {
        if (err) {
          return cb(err);
        }

        return cb(null, null, reasons.PASSWORD_INCORRECT);
      });
    } else {
      // If there's no lock or failed attempts, just return the user
      if (!user.loginAttempts && !user.lockUntil) {
        return cb(null, user);
      }

      // Reset attempts and lock info
      var updates = {
        $set: { loginAttempts: 0 },
        $unset: { lockUntil: 1 }
      };

      return user.update(updates, function(err) {
        if (err) {
          return cb(err);
        }

        return cb(null, user);
      });
    }
  });
};

export default mongoose.model('User', UserSchema);
